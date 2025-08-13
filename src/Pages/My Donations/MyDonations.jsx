import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaUndo, FaSpinner } from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthProvider/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyDonations = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient();
  useEffect(() => {
      document.title = "My Donations | Cuddly Paws"
    }, [])

  // Fetch donations
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['myDonations', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/donation-payments', {
        params: { email: user?.email }
      });
      return res.data;
    },
    enabled: !!user?.email
  });

  // Refund mutation
  const { mutate: requestRefund, isPending } = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/donation-payments/${id}`, {
      params: { email: user?.email }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['myDonations']);
      Swal.fire({
        title: 'Refund Requested!',
        text: 'Your refund has been processed',
        icon: 'success'
      });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Refund failed',
        icon: 'error'
      });
    }
  });

  const handleRefund = (id) => {
    Swal.fire({
      title: 'Request Refund?',
      text: "This will remove your donation from the campaign",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, request refund'
    }).then((result) => {
      if (result.isConfirmed) {
        requestRefund(id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          <Skeleton width={250} />
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {["Campaign", "Target", "Days Left", "Status"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    <Skeleton width={80} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {[...Array(3)].map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Skeleton circle width={40} height={40} />
                      <div className="ml-4">
                        <Skeleton width={100} height={20} />
                        <Skeleton width={150} height={16} className="mt-1" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton width={80} height={20} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton width={60} height={20} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton width={60} height={20} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-600 dark:text-sky-400 play mb-6">
        My Donations
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-blue-100 dark:bg-blue-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">#</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Pet</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Donation Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {donations.map((donation, index) => (
              <tr key={donation._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {index + 1}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex flex-col justify-center items-center">
                    <img 
                      src={donation.image} 
                      alt={donation.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {donation.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {donation.amount}৳
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {new Date(donation.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleRefund(donation._id)}
                    disabled={isPending}
                    className="cursor-pointer text-red-600 hover:text-red-900 dark:hover:text-red-400 flex items-center gap-1"
                  >
                    {isPending ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaUndo />
                    )}
                    <span>Refund</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {donations.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-300">
          You haven't made any donations yet.
        </div>
      )}
    </div>
  );
};

export default MyDonations;