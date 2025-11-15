/* eslint-disable react/react-in-jsx-scope */

import { useState } from "react"
import { Users } from "../types"
import { toast } from "sonner"
import { FaArrowLeftLong } from "react-icons/fa6"

interface Props {
  users: Users[]
	setFormType: (state: 'login' | 'register' | null) => void
  setUsername: (username: string | null) => void
  setShowLoginModal: (state: boolean) => void
}

function LoginForm({ setFormType, setShowLoginModal, users, setUsername }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
		email: '',
		password: ''
	})

	const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const newErrors = { email: "", password: "" };
    let isValid = true;
    
    if (email) {
      const emailExist = users.find(user => user.email === email)

      if (!emailExist) {
        newErrors.email = 'No existe ninguna cuenta con este correo, por favor ingrese un correo valido'
        isValid = false
      }

      if (emailExist) {
        const userWhitTheEmail = users.findIndex(user => user.email === email)
        
        if (users[userWhitTheEmail].password !== password) {
          newErrors.password = 'La contraseña es incorrecta, pruebe ingresarla nuevamente'
          isValid = false
        }
      }
    } else {
      newErrors.email = 'Ingrese un correo'
      isValid = false
    }

    if (!isValid) {
      setErrors(newErrors);
    } else {
      setErrors({ email: "", password: "" })
      setFormType(null)
      toast.success('Session started successfully')
      const userWhitTheEmail = users.findIndex(user => user.email === email)
      const username = users[userWhitTheEmail].username
      setUsername(username)
      localStorage.setItem('user', JSON.stringify(username))
    }
	}

  return (
    <form onClick={() => setFormType(null)} onSubmit={handleSubmit} className="fixed inset-0 bg-black bg-opacity-50 w-full flex justify-center items-center z-50">
      <div onClick={e => e.stopPropagation()} className="relative bg-[#272835] rounded-lg shadow-lg pt-6 px-6 w-96 flex flex-col pb-8 ">
        <FaArrowLeftLong
            onClick={() => {
              setShowLoginModal(true);
              setFormType(null)
            }}
            className="cursor-pointer p-2 absolute left-4 top-5 text-gray-300"
            size={40}
          />
        <h2 className="mb-4 text-center text-xl text-gray-300 font-bold">Enter my account</h2>
				<label htmlFor="email" className="flex flex-col mb-4">
					<span className="text-gray-300 text-lg font-bold">Email</span>
					<input onChange={e => setEmail(e.target.value)} value={email} type="text" id="email" className="bg-gray-700 rounded-sm py-2 px-4 text-white outline-none border-2 border-transparent focus:border-b-[#DD8270]" />
				</label>
				<label htmlFor="password" className="flex flex-col mb-6">
					<span className="text-gray-300 text-lg font-bold">Password</span>
					<input onChange={e => setPassword(e.target.value)} value={password} type="password" id="password" className="bg-gray-700 rounded-sm py-2 px-4 text-white outline-none border-2 border-transparent focus:border-b-[#DD8270] " />
				</label>
				<button type="submit" className="p-3 bg-[#DD8270] text-white font-semibold rounded-md">Login</button>
        {
          errors.email && <p className="mt-4 text-gray-200 text-center rounded-xl font-semibold bg-red-400 p-2">{errors.email}</p>
        }
        {
          (!errors.email && errors.password) && <p className="mt-4 text-gray-200 text-center rounded-xl font-semibold bg-red-400 p-2">{errors.password}</p>
        }
      </div>
    </form>
  )
}

export default LoginForm