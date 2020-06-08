// code that runs in the client, aka browser
const deleteProduct = (btn) => {
  const prodId = btn.parentNode.querySelector("[name=productId]").value;
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
  const productElem = btn.closest('article');
  fetch(`/admin/product/${prodId}`, {
    method: "DELETE",
    headers: {
      "csrf-token": csrf,
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
      // remove function is not available in certain versions of IE
      // must use parentNode and removeChild in old browsers
      productElem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};
