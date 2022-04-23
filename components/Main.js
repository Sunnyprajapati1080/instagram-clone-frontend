import Image from 'next/image'
import { useEffect, useState } from 'react'
import PostCard from './PostCard'

const Main = (props) => {
  const [posts, setposts] = useState(props.posts.slice(0, 5))
  const fetchData = () => {
    if ((outerHeight + scrollY) >= document.body.clientHeight)
      setposts([...posts, ...props.posts.slice(posts.length, posts.length + 5)])
  }
  useEffect(() => {
    window.addEventListener("scroll", fetchData)
    return () => {
      window.removeEventListener("scroll", fetchData)
    }
  })
  return (
    <div id='posts_container' className='mb-[103px] sm:mb-0 max-w-[600px] flex flex-col relative top-14 mx-auto'>
      {posts.length === 0 ? <div className='flex p-2 justify-center text-center flex-col items-center max-w-[500px] mx-auto'><a href="http://www.freepik.com"><Image src="/empty.jpg" width={450} height={450} alt="no posts!" /></a> <h3 className='text-lg font-semibold'>start following your friends to see their posts!</h3></div> :
        posts.map((post, index) => {
          return <PostCard key={index} comments={post._doc.comments} liked={post.liked} postId={post._doc._id} profileUrl={post._doc.user._id} likes={post._doc.likes} desc={post._doc.desc} username={post._doc.user.username} profileImg={post._doc.user.profileImg === "" ? "/profile.png" : `${process.env.NEXT_PUBLIC_HOST}/${post._doc.user.profileImg}`} image={`${process.env.NEXT_PUBLIC_HOST}/${post._doc.img}`} />
        })}
    </div>
  )
}
export default Main