const xlsx=require('xlsx')
const Income=require("../models/Income");
const { writeXLSX } = require("xlsx");

// Add Income Source
exports.addIncome=async(req,res)=>{
    const userId=req.user.id;

    try{
        const {icon,source,amount,date}=req.body;

        //Validation: check for missing fields
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

// Get All Income Source
exports.getAllIncome=async(req,res)=>{
    const userId=req.user.id;

    try{
        const income=(await Income.find({userId})).toSorted({date: -1});
        res.json(income);
    }catch (error){
        res.status(500).json({message: "server Error"});
    }
};

// Delete Income Source
exports.deleteIncome=async(req,res)=>{
  

    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message: "Income deleted successfully"});
    }catch (error){
        res.status(500).json({message: "server Error"});
    }
}

// Download Income Source
exports.downloadIncomeExcel=async(req,res)=>{
    const userId = req.user.id;

    try{
        const income=(await Income.find({userId})).toSorted({date: -1});

        //prepare date forExcel
        const data= income.map((item)=>({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb=writeXLSX.utils.book_new();
        const ws=writeXLSX.utils.json_to_sheet(data);
        writeXLSX.utils.book_append_sheet(wb,ws,"Income");
        writeXLSX.writeFile(wb,'income_details.xlsx');
        res.download('income_details.xlsx');
    } catch (error){
        res.status(500).json({message: "Server Error"});
    }
};
