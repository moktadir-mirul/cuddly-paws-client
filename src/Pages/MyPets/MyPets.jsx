import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import {
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { FaCheckToSlot } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyPets = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  useEffect(() => {
      document.title = "My Pets | Cuddly Paws"
    }, [])

  // Fetch pets added by current user
  const { data: pets = [], isLoading } = useQuery({
    queryKey: ["myPets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/allpets", {
        params: { email: user?.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { mutate: deletePet } = useMutation({
    mutationFn: (petId) => axiosSecure.delete(`/pets/${petId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myPets"]);
      Swal.fire("Deleted!", "The pet has been removed.", "success");
    },
  });

  const { mutate: markAsAdopted } = useMutation({
    mutationFn: (petId) => axiosSecure.patch(`/pets/${petId}/adopt`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myPets"]);
      Swal.fire("Success!", "Pet marked as adopted.", "success");
    },
  });

  const handleDelete = (petId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePet(petId);
      }
    });
  };

  // Table columns
  const columns = [
    {
      accessorKey: "serial",
      header: "#",
      cell: ({ row }) => row.index + 1,
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "Pet",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="text-lg font-medium text-blue-600 dark:text-sky-400">
            {row.original.name}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <h1 className="font-normal text-base text-center lg:text-left pl-0 lg:pl-5 text-black dark:text-gray-200">
          {row.original.category}
        </h1>
      ),
    },
    {
      accessorKey: "adopted",
      header: "Status",
      cell: ({ getValue }) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            getValue()
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          {getValue() ? "Adopted" : "Not Adopted"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() =>
              navigate(`/dashboard/updatepet/${row.original.petId}`)
            }
            className="p-2 cursor-pointer text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-200 rounded-full"
            title="Edit"
          >
            <FaEdit size={25} />
          </button>
          <button
            onClick={() => handleDelete(row.original._id)}
            className="p-2 cursor-pointer text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-full"
            title="Delete"
          >
            <FaTrash size={25} />
          </button>
          {!row.original.adopted && (
            <button
              onClick={() => markAsAdopted(row.original._id)}
              className="p-2 cursor-pointer text-blue-600 hover:bg-blue-100 dark:hover:bg-sky-400 rounded-full"
              title="Mark as Adopted"
            >
              <FaCheckToSlot size={25} />
            </button>
          )}
        </div>
      ),
      enableSorting: false,
    },
  ];

  // Create table instance
  const table = useReactTable({
    data: pets,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
      <h2 className="text-3xl play font-bold text-blue-600 dark:text-sky-400 mb-6">
        My Added Pets
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-200 dark:bg-blue-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-base font-medium text-gray-900 dark:text-gray-200 uppercase tracking-wider"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center justify-start gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <FaSortUp className="ml-1" />,
                        desc: <FaSortDown className="ml-1" />,
                      }[header.column.getIsSorted()] ?? (
                        <FaSort className="ml-1 opacity-50" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pets.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          You haven't add any pet yet.
        </div>
      )}

      {/* Pagination */}
      {table.getPageCount() > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex gap-1">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Previous
            </button>
            {Array.from({ length: table.getPageCount() }).map((_, i) => (
              <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={`px-3 py-1 rounded-md ${
                  table.getState().pagination.pageIndex === i
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MyPets;
