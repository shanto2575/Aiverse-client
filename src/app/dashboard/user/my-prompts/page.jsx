'use client'

import { userPrompts } from '@/lib/api/user/data'
import { authClient } from '@/lib/auth-client'
import { useState, useEffect } from 'react'
import MyPromptTable from '@/components/Dashboard/user/MyPromptTable'

const MyPromptsPage = () => {
  const [myPrompt, setMyPrompt] = useState([])
  const { data: session } = authClient.useSession()
  const user = session?.user

  useEffect(() => {
    if (!user?.email) return

    const PromptData = async () => {
      try {
        const prompt = await userPrompts(user.email)
        setMyPrompt(prompt)
      } catch (error) {
        console.log(error)
      }
    }

    PromptData()
  }, [user?.email])

  return (
    <div>
      <MyPromptTable prompts={myPrompt} />
    </div>
  )
}

export default MyPromptsPage