'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/Input'
import Button from '@/components/ui/Button'


export default function Login() {
  const t = useTranslations()
  const router = useRouter();
  // const { login, isLoading } = useAuthStore()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear validation errors when user types
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const errors = {
      email: '',
      password: '',
    }
    let isValid = true

    if (!formData.email) {
      errors.email = t('errors.required').replace('{field}', t('auth.email'))
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t('errors.emailFormat')
      isValid = false
    }

    if (!formData.password) {
      errors.password = t('errors.required').replace('{field}', t('auth.password'))
      isValid = false
    }

    setValidationErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-40">
      <h1 className="text-2xl font-bold mb-6 text-center">{t('auth.login')}</h1>
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          name="email"
          type="email"
          label={t('auth.email')}
          value={formData.email}
          onChange={handleChange}
          error={validationErrors.email}
          placeholder="john@example.com"
        />
        <Input
          id="password"
          name="password"
          type="password"
          label={t('auth.password')}
          value={formData.password}
          onChange={handleChange}
          error={validationErrors.password}
        />
        <div className="mb-4 text-right">
          <Link href={`/auth/forgot-password`} className="text-sm text-blue-600 hover:underline">
            {t('auth.forgotPassword')}
          </Link>
        </div>
        <Button type="submit" fullWidth>
          {t('auth.login')}
        </Button>
      </form>
      <div className="mt-6 text-center">
        <p>
          {t('auth.dontHaveAccount')}{' '}
          <Link href={`/auth/register`} className="text-blue-600 hover:underline">
            {t('auth.signUp')}
          </Link>
        </p>
      </div>
    </div>
  )
} 