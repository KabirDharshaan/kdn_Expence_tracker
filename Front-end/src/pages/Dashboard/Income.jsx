
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosinstance"; 
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddincomeForm from "../../components/Income/AddincomeForm";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);




  const fetchIncomeDetails = async () => {
  if (loading) return;

  setLoading(true);
  try {
    const token = localStorage.getItem("token"); 
    const response = await axiosInstance.get(
      `${API_PATHS.INCOME.GET_ALL_INCOME}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    if (response.data) {
      setIncomeData(response.data);
    }
  } catch (error) {
    console.log("Something went wrong. Please try again", error);
  } finally {
    setLoading(false);
  }
};


  const handleAddIncome = async (income) => {
    // implement add income logic
  };

  const deleteIncome = async (id) => {
    // implement delete logic
  };

  const handleDownloadIncomeDetails = async () => {
    // implement download logic
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />
        </div>
        </div>
        <Modal 
           isOpen={openAddIncomeModal}
           onClose={() => setOpenAddIncomeModal(false)}
           title="Add Income"
           >
            <AddincomeForm onAddIncome={handleAddIncome} />
           </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
