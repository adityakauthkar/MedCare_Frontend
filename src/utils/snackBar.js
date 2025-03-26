// src/utils/snackBar.js

import Toast from 'react-native-toast-message';

export const ShowToast = () => {
    Toast.show({
        type: 'success',
        text1: 'Successfully Logged In!',
        position: 'top',
    });
};
