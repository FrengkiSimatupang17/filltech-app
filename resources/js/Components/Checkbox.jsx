export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded bg-gray-700 border-gray-600 text-green-600 shadow-sm focus:ring-green-500 ' +
                className
            }
        />
    );
}