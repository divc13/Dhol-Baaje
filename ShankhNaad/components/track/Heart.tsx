import { AiFillHeart } from "react-icons/ai";
import { useRouter } from 'next/router';
import { useWallet } from "@meshsdk/react";

interface HeartProps {
  hasLiked: boolean;
  handleLike: () => void;
}

const Heart = ({ hasLiked, handleLike }: HeartProps) => {
  const router = useRouter();
  const { connected } = useWallet();
  
  const handleLikeButton = (e: any) => {
    e.stopPropagation();
    if(!connected){
      router.push('/login');
    }
    else{
      handleLike()
    }
  }
  return (
    <>
      <AiFillHeart
        className={`text-xl ml-3 icon ${
          hasLiked ? "text-[#1ED760]" : "text-[#868686]"
        }`}
        onClick={(e)=>{handleLikeButton(e)}}
      />
    </>
  );
};

export default Heart;
