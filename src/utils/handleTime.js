const handleTime = dateString => {
  let date = new Date(dateString);
  let ret = '';
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
};

export default handleTime;
