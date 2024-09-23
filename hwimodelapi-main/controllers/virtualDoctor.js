import virtualDoctor from "../utils/virtualDoctor.js";
export default async (req, res) => {
  const prmt = req.body.text;
  console.log(prmt);
  try {
    const data = await virtualDoctor(prmt);
    res.status(200).json({ message: "Data received", data: data });
  } catch {
    res.status(400).json({ message: "Some error occured" });
  }
};
