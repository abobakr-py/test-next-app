import { BASE_URL } from "@/config/config";
import { axiosInstance as axios } from "@/config/axiosInstance";
import { useQuery } from "@tanstack/react-query";

// Async function to get user transactions
const getUserMoneyTransactions = async (filter) => {
  const { type, status, limit, page, id, date_from, date_to } = filter;
  const response = await axios.get(
    `${BASE_URL}/transactions/userTransactions`,
    {
      params: {
        type: type ? `[${type}]` : null,

        status: status ? `[${status}]` : null,
        limit,
        page,
        id,
        date_from,
        date_to,
      },
    }
  );
  return response.data?.data;
};

// Custom hook to use the query
export const useUserMoneyTransactions = (filter) => {
  return useQuery({
    queryKey: ["userMoneyTransactions", filter],
    queryFn: () => getUserMoneyTransactions(filter),
  });
};
// Async function to get user transactions
const getUserGoldTransactions = async (filter) => {
  const { type, status, limit, page, id, date_from, date_to } = filter;
  const response = await axios.get(`${BASE_URL}/goldTransactions/mobile`, {
    params: {
      transactionType: type ? `[${type}]` : null,
      status: status ? `[${status}]` : null,
      limit,
      page,
      id,
      date_from,
      date_to,
    },
  });
  return response.data?.data;
};

// Custom hook to use the query
export const useUserGoldTransactions = (filter) => {
  return useQuery({
    queryKey: ["userGoldTransactions", filter],
    queryFn: () => getUserGoldTransactions(filter),
  });
};
// Async function to get user transactions
const getUserCurrentBalance = async () => {
  const response = await axios.get(`${BASE_URL}/transactions/currentBalance`);
  return response.data?.data;
};

// Custom hook to use the query
export const useUserCurrentBalance = () => {
  return useQuery({
    queryKey: ["currentBalance"],
    queryFn: getUserCurrentBalance,
  });
};
// Async function to get user transactions
const getTransactionDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/transactions/view/${id.id}`);
  return response.data?.data;
};

// Custom hook to use the query
export const useGetTransactionDetails = (id) => {
  return useQuery({
    queryKey: ["transactionDetails", id],
    queryFn: () => getTransactionDetails(id),
    enabled: !!id, // Ensure the query runs only if the id exists
  });
};
// Async function to get user transactions
const getAllUserSerials = async () => {
  const response = await axios.get(
    `${BASE_URL}/goldTransactions/fractionSerialsForUser`
  );
  return response.data?.data;
};

// Custom hook to use the query
export const useGetAllUserSerials = () => {
  return useQuery({
    queryKey: ["userSerials"],
    queryFn: () => getAllUserSerials(),
  });
};
