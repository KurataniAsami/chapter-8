'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Post } from '../types/Post'

const BlogList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetch(
        'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts'
      )
      const data = await response.json()
      setPosts(data.posts)
      setLoading(false)
    }

    getAllPosts()
  }, [])

  if (loading) return <p>loading</p>
  if (posts.length === 0) return <p>記事が見つかりません</p>

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}
          className='border border-gray-300 max-w-3xl mx-auto my-5'
        >
          <Link
            href={`/post/${post.id}`}
          >
            <div className='flex justify-between mx-4 my-4'>
              <div>{post.createdAt}</div>
              <div className='border-2 border-blue-500 rounded px-2 py-1 text-blue-500'>
                {post.categories.join('')}
              </div>
            </div>

            <h3 className='mx-4 mb-3'>
              {post.title}
            </h3>

            <div>
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className='line-clamp-2 mx-4 mb-3'
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default BlogList

// line-clampのインストール
// npm install -D @tailwindcss/line-clamp