/* eslint-disable react/react-in-jsx-scope */
import { AiOutlineWarning } from "react-icons/ai";

interface Props {
  error: string
}

function ErrorComponent({ error }: Props) {
  return (
    <form className="fixed inset-0 bg-black bg-opacity-50 w-full flex justify-center items-center z-50">
      <div className="bg-[#272835] rounded-lg shadow-lg py-6 px-6 w-96 flex flex-col items-center text-center">
				<AiOutlineWarning className="text-red-400" size={40} />
        <p className="text-gray-300 text-pretty">{error}</p>
      </div>
    </form>
  )
}

export default ErrorComponent