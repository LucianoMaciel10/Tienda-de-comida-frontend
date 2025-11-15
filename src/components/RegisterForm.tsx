/* eslint-disable react/react-in-jsx-scope */
import { FaArrowLeftLong } from "react-icons/fa6";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/OrdersContext";
import { toast } from "sonner";
import { Users } from "../types";

interface Props {
  users: Users[];
  setShowLoginModal: (state: boolean) => void;
  setFormType: (state: "login" | "register" | null) => void;
}

function RegisterForm({ setFormType, setShowLoginModal, users }: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Error en la solicitud de datos para el componente App");
  }

  const { setError } = context;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    };
    let isValid = true;

    if (username.trim().length < 3) {
      newErrors.username =
        "El nombre de usuario debe tener al menos 3 caracteres";
      isValid = false;
    }

    const emailExist =
      Array.isArray(users) && users.some((user) => user.email === email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = "Por favor, ingresa un correo electrónico válido";
      isValid = false;
    }

    if (emailExist) {
      newErrors.email = "El correo ingresado ya esta vinculado a una cuenta";
      isValid = false;
    }

    if (password.trim().length < 4) {
      newErrors.password = "La contraseña es muy corta";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Ingrese la contraseña del correo";
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "La contraseña no coincide con la confirmacion de contraseña";
      isValid = false;
    }

    const phoneRegex =
      /^\+?(\d{1,4})?[-.\s]?(\d{1,4})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/;

    if (
      phoneNumber &&
      (!phoneRegex.test(phoneNumber) ||
        phoneNumber.replace(/\D/g, "").length !== 9)
    ) {
      newErrors.phoneNumber = "Por favor, ingresa un número de teléfono válido";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
    } else {
      // Si la validación es exitosa, hacer el envío al backend
      handleRegistration();
    }
  };

  const handleRegistration = async () => {
    const newUsers = [...users, { username, email, password, phoneNumber }];

    try {
      const response = await fetch(
        "https://api.jsonbin.io/v3/b/67425d9ae41b4d34e4596d3d",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key":
              "$2a$10$T3mC53A4kR2vnHUf1F9tSeanbKbsW21qlctHyKY/dZNRiSM3vdque",
          },
          body: JSON.stringify({ users: newUsers }),
        }
      );

      if (response.ok) {
        setFormType("login");
        toast.success("User created successfully");
      } else {
        toast.error("There was an error creating the user, please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form
      onClick={() => setFormType(null)}
      onSubmit={handleSubmit}
      className="fixed inset-0 bg-black bg-opacity-50 w-full flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#272835] rounded-lg shadow-lg pt-6 px-6 w-96 flex flex-col pb-8 relative"
      >
        <FaArrowLeftLong
          onClick={() => {
            setShowLoginModal(true);
            setFormType(null)
          }}
          className="cursor-pointer p-2 absolute left-4 top-5 text-gray-300"
          size={40}
        />
        <h2 className="mb-4 text-center text-xl text-gray-300 font-bold">
          Register
        </h2>
        <label htmlFor="username" className="flex flex-col mb-4">
          <span className="text-gray-300 text-lg font-bold">
            Username <span className="text-[#DD8270]">*</span>
          </span>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            id="username"
            className="bg-gray-700 rounded-sm py-2 px-4 text-white outline-none border-2 border-transparent focus:border-b-[#DD8270]"
          />
        </label>
        <label htmlFor="email" className="flex flex-col mb-4">
          <span className="text-gray-300 text-lg font-bold">
            Email <span className="text-[#DD8270]">*</span>
          </span>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            className="bg-gray-700 rounded-sm py-2 px-4 text-white outline-none border-2 border-transparent focus:border-b-[#DD8270]"
          />
        </label>
        <label htmlFor="password" className="flex flex-col mb-4">
          <span className="text-gray-300 text-lg font-bold">
            Email password <span className="text-[#DD8270]">*</span>
          </span>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            className="bg-gray-700 rounded-sm py-2 px-4 text-white outline-none border-2 border-transparent focus:border-b-[#DD8270] "
          />
        </label>
        <label htmlFor="confirmPassword" className="flex flex-col mb-4">
          <span className="text-gray-300 text-lg font-bold">
            Confirm email password <span className="text-[#DD8270]">*</span>
          </span>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            id="confirmPassword"
            className="bg-gray-700 rounded-sm py-2 px-4 text-white outline-none border-2 border-transparent focus:border-b-[#DD8270] "
          />
        </label>
        <label htmlFor="phone" className="flex flex-col mb-6">
          <span className="text-gray-300 text-lg">Phone number</span>
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            type="tel"
            id="phone"
            className="bg-gray-700 rounded-sm py-2 px-4 text-white outline-none border-2 border-transparent focus:border-b-[#DD8270]"
          />
        </label>
        <button
          type="submit"
          className="p-3 bg-[#DD8270] text-white font-semibold rounded-md active:bg-[#bf6f5f]"
        >
          Create account
        </button>
        {errors.username && (
          <p className="mt-4 text-gray-200 text-center rounded-xl font-semibold bg-red-400 p-2">
            {errors.username}
          </p>
        )}
        {!errors.username && errors.email && (
          <p className="mt-4 text-gray-200 text-center font-semibold rounded-xl bg-red-400 p-2">
            {errors.email}
          </p>
        )}
        {!errors.username && !errors.email && errors.password && (
          <p className="mt-4 text-gray-200 text-center font-semibold rounded-xl bg-red-400 p-2">
            {errors.password}
          </p>
        )}
        {!errors.username &&
          !errors.email &&
          !errors.password &&
          errors.confirmPassword && (
            <p className="mt-4 text-gray-200 text-center font-semibold rounded-xl bg-red-400 p-2">
              {errors.confirmPassword}
            </p>
          )}
        {!errors.username &&
          !errors.email &&
          !errors.password &&
          !errors.confirmPassword &&
          errors.phoneNumber && (
            <p className="mt-4 text-gray-200 text-center font-semibold rounded-xl bg-red-400 p-2">
              {errors.phoneNumber}
            </p>
          )}
      </div>
    </form>
  );
}

export default RegisterForm;
