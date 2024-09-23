import getReqTests from "../utils/getreqtests.js";
export default async (req, res) => {
  const body=req.body;
  var str=req.body.csstring;
  str = str.split(',');
  str = str.reduce((accumulator, currentValue) => {
  return accumulator + (accumulator ? ' ' : '') + currentValue;
   }, '');
  try{
    const data = await getReqTests(str)
    res.status(200).json({ message: 'Data received', data: data });
  }
  catch{
    res.status(400).json({message: "Some error occured"});
  }
}