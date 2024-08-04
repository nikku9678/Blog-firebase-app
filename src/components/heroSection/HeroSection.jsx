import { Typography } from '@material-tailwind/react'
import React, { useContext } from 'react'
import myContext from '../../context/data/myContext';

function HeroSection() {
    const context = useContext(myContext);
    const { mode } = context;
    return (
        <section
            style={{ background: mode === 'dark' ? 'rgb(30, 41, 59)' : '#30336b' }}>

            {/* Hero Section  */}
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                {/* Main Content  */}
                <main>
                    <div className="text-center">
                        <div className="mb-2">
                            {/* Image  */}
                            <div className="flex justify-center">
                                <img src="https://cdn-icons-png.flaticon.com/128/3685/3685253.png" alt="" />
                            </div>

                            {/* Text  */}
                            <h1 className=' text-3xl text-white font-bold'>QuillQuest</h1>
                        </div>

                        {/* Paragraph  */}
                        <div class=" text-white relative container mx-auto px-6 py-5 text-center">
      <h1 class="text-5xl font-bold leading-tight mb-4">
        Welcome to Our Blog
      </h1>
      <p class="text-xl mb-8">
        Discover the latest articles, tips, and insights from our experts.
      </p>
      <a href="#latest-posts" class="inline-block hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
        Read Our Latest Posts
      </a>
    </div>
                    </div>

                </main>
            </div>
        </section>
    )
}

export default HeroSection