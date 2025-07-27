

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  )
}

export default Spinner