import getDiagnosed from "../utils/getdiagnosed.js";
export default async (req, res) => {
  const body=req.body;
  var symptoms=req.body.symptoms;
  var testReports=req.body.testreports;
  try{
    const data = await getDiagnosed(symptoms,testReports)
    res.status(200).json({ message: 'Data received', data: data });
  }
  catch{
    res.status(400).json({message: "Some error occured"});
  }
}