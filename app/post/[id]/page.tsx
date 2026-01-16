'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image'

const PostDetail = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState(false);

  useEffect(() => {
    const getAllPosts = async () => {
    const response = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`)
    const data = await response.json();
    setPost(data.post);
    setLoading(false);
    if (!data.post) {
      setError(true);
    }
  };
  getAllPosts();
  }, [id]);

  if (loading) return <p>loading</p>
  if (error || !post)  return <p>記事が見つかりません</p>
  
  return (
    <div className='w-[800px] mx-auto'>
      <Image
        src={post.thumbnailUrl}
        width={800}
        height={400}
        className='mx-auto mt-10'
      />

      <div className='flex justify-between mx-5 items-center my-3'>
        <div>{post.createdAt}</div>
        <div className='border-2 border-blue-500 rounded px-2 py-1 text-blue-500 inline-block'>
          {post.categories.join('')}
        </div>
      </div>
      <h2  className='text-2xl mb-3 mx-4'>
        {post.title}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: post.content }} 
        className='mx-4 mb-20'
      />
    </div>
  )
}

export default PostDetail
