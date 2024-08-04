import { Button } from '@material-tailwind/react';
import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function BlogPostCard() {
  const context = useContext(myContext);
  const { mode, getAllBlog } = context;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState([]);

  useEffect(() => {
    if (getAllBlog.length > 0) {
      setLoading(false);
      setImageLoading(Array(getAllBlog.length).fill(true));
    }
  }, [getAllBlog]);

  const handleImageLoad = (index) => {
    const newImageLoading = [...imageLoading];
    newImageLoading[index] = false;
    setImageLoading(newImageLoading);
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl">

          {/* Main Content */}
          {loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <div className="loader">Loading...</div>
            </div>
          ) : (
            <div className="flex flex-wrap -m-4 mb-5">
              {getAllBlog.length > 0 ? (
                <>
                  {getAllBlog.map((item, index) => {
                    const { thumbnail, date, id } = item;
                    return (
                      <div key={index} className="p-4 md:w-1/3">
                        <div
                          style={{
                            background: mode === 'dark' ? 'rgb(30, 41, 59)' : 'white',
                            borderBottom: mode === 'dark' ? '4px solid rgb(226, 232, 240)' : '4px solid rgb(30, 41, 59)',
                            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
                          }}
                          className={`p-2 h-[360px] shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-gray-400 animate-none hover:border-2 border-red-600 duration-150 ${
                            mode === 'dark' ? 'shadow-gray-700' : 'shadow-xl'
                          } rounded-xl overflow-hidden `}
                        >
                          {/* Blog Thumbnail */}
                          <div className="relative">
                            {imageLoading[index] && (
                              <div className="image-placeholder">
                                <div className="loader"></div>
                              </div>
                            )}
                            <img
                              onLoad={() => handleImageLoad(index)}
                              onClick={() => navigate(`/bloginfo/${id}`)}
                              className={`w-full h-48 object-cover rounded-md ${imageLoading[index] ? 'hidden' : 'block'}`}
                              src={thumbnail}
                              alt="blog"
                            />
                          </div>

                          {/* Top Items */}
                          <div className="p-6">
                            {/* Blog Date */}
                            <h2
                              className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                              style={{
                                color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)'
                              }}
                            >
                              {date}
                            </h2>

                            {/* Blog Title */}
                            <h1
                              className="title-font text-lg font-bold text-gray-900 mt-2"
                              style={{
                                color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)'
                              }}
                            >
                              {item.blogs.title}
                            </h1>

                            {/* Blog Description */}
                            <p
                              className="leading-relaxed mb-3"
                              style={{
                                color: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)'
                              }}
                            >
                              {''}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <h1>Not Found</h1>
              )}
            </div>
          )}

          {/* See More Button */}
          <Link to={'/allblogs'}>
            <div className="flex justify-center my-5">
              <Button
                style={{
                  background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                  color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)'
                }}
              >
                See More
              </Button>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default BlogPostCard;
