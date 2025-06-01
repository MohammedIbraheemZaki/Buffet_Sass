'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'



export default function ProfileClient() {
  const t = useTranslations()
  const [mounted, setMounted] = useState(false)
  
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
    setPasswordError('')
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError(t('errors.passwordMatch'))
      return
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError(t('errors.passwordLength'))
      return
    }
    
    try {
      // TODO: Implement password update
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setIsEditingPassword(false)
    } catch (error) {
      setPasswordError('Failed to update password')
      console.log(error)
    }
  }
  
  const toggleEditMode = () => {
    if (isEditing) {
      // Reset form data if canceling edit
      setFormData({
        name: "",
        email: "",
      })
    }
    setIsEditing(!isEditing)
  }

  const togglePasswordEditMode = () => {
    if (isEditingPassword) {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setPasswordError('')
    }
    setIsEditingPassword(!isEditingPassword)
  }
  
  return (
    <div className="max-w-2xl mx-auto mt-40 h-full">
      <div className="bg-white p-8 my-auto rounded-lg shadow-md ">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="mb-3 text-2xl font-bold">{t('profile.yourProfile')}</h1>
          <div className="flex gap-2">
            <Link href={`/admin`}>
              <Button variant="outline" className='cursor-pointer'>
                {t('profile.admin')}
              </Button>
            </Link>
            <Link href={`/user`}>
              <Button variant="outline" className='cursor-pointer'>
                {t('profile.user')}
              </Button>
            </Link>
            <Button 
              variant={isEditing ? 'outline' : 'primary'} 
              onClick={toggleEditMode}
              className='cursor-pointer'
            >
              {isEditing ? t('profile.cancel') : t('profile.edit')}
            </Button>
          </div>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <Input
              id="name"
              name="name"
              type="text"
              label={t('profile.name')}
              value={formData.name}
              onChange={handleChange}
            />
            
            <Input
              id="email"
              name="email"
              type="email"
              label={t('profile.email')}
              value={formData.email}
              onChange={handleChange}
              className="opacity-70"
            />
            
            <div className="mt-6">
              <Button type="submit" className='cursor-pointer'>
                {t('profile.save')}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('profile.name')}</h3>
              <p className="mt-1 text-lg">{"user name"}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('profile.email')}</h3>
              <p className="mt-1 text-lg">{"user@example.com"}</p>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{t('profile.password')}</h3>
                <Button 
                  variant={isEditingPassword ? 'outline' : 'primary'} 
                  onClick={togglePasswordEditMode}
                  className='cursor-pointer'
                >
                  {isEditingPassword ? t('profile.cancel') : t('profile.changePassword')}
                </Button>
              </div>

              {isEditingPassword ? (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    label={t('profile.currentPassword')}
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                  
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    label={t('profile.newPassword')}
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                  
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label={t('profile.confirmPassword')}
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    error={passwordError}
                  />
                  
                  <Button type="submit" >
                    {t('profile.updatePassword')}
                  </Button>
                </form>
              ) : (
                <p className="text-muted-foreground">••••••••</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 