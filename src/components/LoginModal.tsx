/* eslint-disable react/react-in-jsx-scope */

interface Props {
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>
  setFormType: React.Dispatch<React.SetStateAction<"login" | "register" | null>>
}

function LoginModal({ setFormType, setShowLoginModal }: Props) {

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: "login" | "register" | null) => {
    event.preventDefault()
    setShowLoginModal(false)
    if (type === 'login') {
      setFormType('login')
    } else {
      setFormType('register')
    }
  }

  return (
    <form onClick={() => setShowLoginModal(false)} className="fixed inset-0 bg-black bg-opacity-50 w-full flex justify-center items-center z-50">
      <div onClick={e => e.stopPropagation()} className="bg-[#272835] rounded-lg shadow-lg p-6 pb-7 w-96 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-gray-300">
        To purchase, log in to your account
        </h2>
        <div className="flex flex-col w-[80%] text-center gap-3 text-lg font-semibold">
          <button 
            className="bg-[#DD8270] text-gray-300 p-3 rounded-lg cursor-pointer"
            onClick={event => handleClick(event, 'login')}
          >
            Login
          </button>
          <button 
            className="border border-[#DD8270] text-[#DD8270] p-3 rounded-lg cursor-pointer hover:bg-[#353646]"
            onClick={event => handleClick(event, 'register')}
          >
            Create account
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginModal;
