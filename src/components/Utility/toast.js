import toast from "react-hot-toast";

export const showToast = {
    success: (message) => {
        toast.success(message, {
            style: {
                border: '2px solid #b8cbaf', 
                padding: '16px',
                color: '#2c3522', 
                background: '#edf3e9',
                fontWeight: 'bold',
            },
            iconTheme: {
                primary: '#4c7a34',
                secondary: '#edf3e9',
            },
        });
    },

    error: (message) => {
        toast.error(message, {
            style: {
                border: '2px solid #dca8a8', 
                padding: '16px',
                color: '#4a1e1e',
                background: '#fcf1f1',
                fontWeight: 'bold',
            },
            iconTheme: {
                primary: '#b23b3b',
                secondary: '#fcf1f1',
            },
        });
    }
};