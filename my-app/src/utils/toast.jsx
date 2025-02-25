import swal from "sweetalert2"

import "animate.css/animate.min.css"

export const toast = (text, title, icon) =>
  swal.fire({
    text: text ? text : "",
    title: title ? title : "",
    icon,
    confirmButtonColor: "#22c55e",
  })

  export const toastConfirm = (text, title, icon) =>
    swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        swal.fire({
          title: "Deleted!",
          text,
          icon: "success"
        });
      }
    });

   export const signedIn = () => {
    const Toast = swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = swal.stopTimer;
        toast.onmouseleave = swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Signed in successfully"
    });
   }

// export const toastConfirm = (text, title, icon) =>
//   swal.fire({
//     title,
//     text,
//     icon,
//     confirmButtonColor: "#134991",
//     showCancelButton: true,
//     confirmButtonText: "Yes",
//     // showClass: {
//     //   popup: "animate__animated animate__fadeInDown",
//     // },
//     // hideClass: {
//     //   popup: "animate__animated animate__fadeOutUp",
//     // },
//   })
