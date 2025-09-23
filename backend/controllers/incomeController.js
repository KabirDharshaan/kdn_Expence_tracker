const xlsx=require('xlsx')
const Income=require("../models/Income");
const { writeXLSX } = require("xlsx");


exports.addIncome=async(req,res)=>{
    const userId=req.user.id;

    try{
        const {icon,source,amount,date}=req.body;

       
        if(!source || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }

        const newIncome=new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    }catch (error){
        res.status(500).json({message: "Server Error"});
    }
}




exports.getAllIncome = async (req, res) => {
  try {
    const userId = req.user?.id; 
    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    const income = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(income);
  } catch (error) {
    console.error("getAllIncome error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.deleteIncome=async(req,res)=>{
  

    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message: "Income deleted successfully"});
    }catch (error){
        res.status(500).json({message: "server Error"});
    }
}


exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 }); // FIXED

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const xlsx = require("xlsx");
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    const filePath = `income_details.xlsx`;
    xlsx.writeFile(wb, filePath);

    res.download(filePath, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).json({ message: "Server Error" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};