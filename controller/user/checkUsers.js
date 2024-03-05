const checkUsers = (req, res) => {
  try {
    const username = req.decoded.username;
  const userid = req.decoded.userid;
  return res.status(200).json({ userid, username });
  } catch (error) {
    return res.status(400).json({ msg:'Not checked user' });
 
  }
  
};
module.exports = checkUsers;
