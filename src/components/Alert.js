import React, { useState } from "react";
import Swal from 'sweetalert2';

export default function Alert(props) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setVisible(true);
    }, 1501); // Set this to a minimum delay after which you want to potentially show the alert again.
  };

  const showSweetAlert = () => {
    Swal.fire({
      title: capitalise(props.alert.type),
      text: props.alert.msg,
      icon: props.alert.type, // Assuming 'type' is suitable for SweetAlert2 icons
      timer: 700, // Alert will automatically close after 1000 milliseconds (1 second)
      timerProgressBar: true, // Shows a progress bar that indicates the time until the alert will close
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer'); // Swal.DismissReason.timer will be passed if popup was closed by timer
      }
    });
  }

  const capitalise = (type) => {
    type = type.toLowerCase();
    const arr = type.split(" ");

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    
    return arr.join(" ");
  };

  // Invoke the alert function when the component mounts and props.alert is true
  React.useEffect(() => {
    if (props.alert && visible) {
      showSweetAlert();
    }
  }, [props.alert, visible]);

  return (
    <div style={{ height: "50px", margin: "58px 0px 0px 0px" }} />
  );
}
