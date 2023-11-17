import './Toast.css'; // Create this file for custom styles

interface ToastProps {
    message: string,
    showToast: boolean,
    onClose: () => void
}

const Toast = ({ message, showToast, onClose }: ToastProps) => {
    return (
        <div className={`toast-container ${showToast ? 'show' : ''}`}>
            <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <strong className="me-auto">Notification</strong>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="toast-body">
                    {message}
                </div>
            </div>
        </div>
    );
};

export default Toast;
