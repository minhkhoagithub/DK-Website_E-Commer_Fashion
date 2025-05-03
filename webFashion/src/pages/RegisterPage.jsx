import Image from "next/image"
import Link from "next/link"
import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Image */}
      <div className="relative w-full md:w-1/2">
        <Image
          src="../img/register-image.png"
          alt="Fashion models with vintage car"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute left-6 top-6 z-10">
          <h1 className="text-2xl font-light tracking-wide">
            <span className="text-amber-800">M</span>ODEVA
          </h1>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full items-center justify-center md:w-1/2">
        <div className="w-full max-w-md px-8 py-12">
          <h1 className="mb-10 text-5xl font-light tracking-wide text-gray-800">REGISTER</h1>
          <RegisterForm />
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Already have account?{" "}
              <Link href="/login" className="text-gray-700 hover:underline">
                Sign In here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
