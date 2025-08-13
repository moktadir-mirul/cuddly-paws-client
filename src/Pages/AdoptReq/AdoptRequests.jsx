import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes, FaSpinner, FaRegCheckCircle } from 'react-icons/fa';
import { ImCancelCircle } from "react-icons/im";
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthProvider/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdoptionRequestsTable = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient();
  useEffect(() => {
      document.title = "Adopt Requests | Cuddly Paws"
    }, [])

  // Fetch adoption requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['adoptionRequests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/adoption-requests', {
        params: { email: user?.email }
      });
      return res.data;
    },
    enabled: !!user?.email
  });

  // Update request status mutation
  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/adoption-requests/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['adoptionRequests']);
      Swal.fire('Updated!', 'Request status updated', 'success');
    },
    onError: (error) => {
      Swal.fire('Error', error.response?.data?.message || 'Update failed', 'error');
    }
  });

  const handleStatusChange = (id, status) => {
    Swal.fire({
      title: `Are you sure you want to ${status} this request?`,
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
      confirmButtonColor: status === 'accept' ? '#3b82f6' : '#ef4444',
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus({ id, status });
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
        Adoption Requests
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-blue-100 dark:bg-blue-700">
            <tr>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Pet</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Requested By</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {requests.map((request, index) => (
              <tr key={request._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col items-center justify-center">
                    <img 
                      src={request.petImage} 
                      alt={request.petName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                      {request.petName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800 dark:text-gray-200">
                  <div className='flex flex-col items-center justify-center'>
                    <h1 className='font-bold'>{request.adoptedReqBy}</h1>
                    <h1>{request.adoptedReqByEmail}</h1>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    <div className='flex flex-col items-center justify-center'>
                    <h1>{request.Phone}</h1>
                    <h1 className='font-bold'>{request.address}</h1>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.reqStatus === 'accepted'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : request.reqStatus === 'rejected'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {request.reqStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {request.reqStatus === 'pending' && (
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleStatusChange(request._id, 'accepted')}
                        className="text-green-600 hover:text-green-900 dark:hover:text-green-400 cursor-pointer"
                        title="Accept"
                      >
                        <FaRegCheckCircle size={25}/>
                      </button>
                      <button
                        onClick={() => handleStatusChange(request._id, 'rejected')}
                        className="text-red-600 cursor-pointer hover:text-red-900 dark:hover:text-red-400"
                        title="Reject"
                      >
                        <ImCancelCircle size={25}/>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {requests.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-300">
          You haven't got any adoption requests yet.
        </div>
      )}
    </div>
  );
};

export default AdoptionRequestsTable;