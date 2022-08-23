
export const hasJWT = () => {
  let flag = false;

  localStorage.getItem('user') ? (flag = true) : (flag = false);
  return flag;
};

export const isManager = () => {
  let flag = false;
  const isManager = JSON.parse(localStorage.getItem('user') || '{}').isManager;
  isManager ?
    (flag = true) :
    (flag = false);

  return flag;
};


