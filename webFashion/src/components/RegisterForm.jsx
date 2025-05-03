"use client"



import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Handle form submission logic here
//   }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          NAME
        </Label>
        <Input id="name" placeholder="John Doe" className="h-12 rounded-sm border-gray-300 bg-white" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          EMAIL
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          className="h-12 rounded-sm border-gray-300 bg-white"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          PASSWORD
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="h-12 rounded-sm border-gray-300 bg-white pr-10"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
          CONFIRM PASSWORD
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className="h-12 rounded-sm border-gray-300 bg-white pr-10"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <Button type="submit" className="mt-8 h-12 w-full rounded-sm bg-amber-800 text-white hover:bg-amber-900">
        REGISTER
      </Button>
    </form>
  )
}
