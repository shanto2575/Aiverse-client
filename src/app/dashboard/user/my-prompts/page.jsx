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
      <div className="p-4 sm:p-6 bg-[#ebdcc9] rounded-t-2xl mb-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#2c221e] tracking-tight">
          My Prompt Templates
        </h2>
        <p className="text-xs sm:text-sm text-[#2c221e]/70 mt-1.5 font-medium">
          Review approval statuses, change details, and check analytics.
        </p>
      </div>
      <div >
        <MyPromptTable prompts={myPrompt} />
      </div>
    </div>
  )
}

export default MyPromptsPage