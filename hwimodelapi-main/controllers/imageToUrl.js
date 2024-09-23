import imageToUrl from "../utils/imagetourl.js";
export default async (req, res) => {
  const img_url = req.query.url;
  console.log(img_url)
  try{
    const data = await imageToUrl(img_url)
    res.status(200).json({ message: 'Data received', data: data });
  }
  catch{
    res.status(400).json({message: "Some error occured"});
  }
}