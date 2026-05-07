import React , { useRef , useState , useEffect }  from 'react'
import  imageData  from '../assets/assets.js';

const Card = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
         setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className='flex flex-wrap cursor-pointer justify-center gap-6 md:gap-8 lg:gap-10 mt-5 mb-[15px] bg-gray-200'>
       {imageData.map((item , index) => (
          <div 
           key={index}
           className={`
               w-full
               max-w-[290px]
               mx-auto
               rounded-[10px]
               overflow-hidden
               border-2 border-transparent
               hover:border-purple-500
               active:border-purple-500
               hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
               active:shadow-[0_0_30px_rgba(168,85,247,0.6)]
               hover:scale-[1.02]
               active:scale-[1.02]
               shadow-lg
               text-center
               transform
               transition-all
               duration-500
               ease-in-out
               ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
          >
             <img src={item.image} className="w-full h-[220px] md:h-[260px] lg:h-[300px] object-cover"/>

             <h2
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold p-2 h-[40px]"
             >{item.name}</h2>
          </div>
       ))}
    </div>
  )
}

export default Card