import React, { useState, useContext, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import myContext from '../../context/data/myContext';
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Button,
    Typography,
} from "@material-tailwind/react";
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { fireDb, storage } from '../../firebase/FirebaseConfig';

function EditBlog() {
    const context = useContext(myContext);
    const { mode } = context;

    const { id } = useParams();
    const [blogs, setBlogs] = useState({
        title: "",
        category: "",
        content: "",
        time: Timestamp.now(),
    });
    const [thumbnail, setThumbnail] = useState(null);
    const [existingThumbnail, setExistingThumbnail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            const docRef = doc(fireDb, "blogPost", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const blogData = docSnap.data();
                setBlogs({
                    title: blogData.blogs.title,
                    category: blogData.blogs.category,
                    content: blogData.blogs.content,
                    time: blogData.time,
                });
                setExistingThumbnail(blogData.thumbnail);
            } else {
                toast.error("Blog not found");
                navigate('/dashboard');
            }
        };

        fetchBlog();
    }, [id, navigate]);

    const updatePost = async () => {
        if (blogs.title === "" || blogs.category === "" || blogs.content === "") {
            return toast.error("All fields are required");
        }
        if (thumbnail) {
            uploadImage();
        } else {
            updateBlog(existingThumbnail);
        }
    };

    const uploadImage = () => {
        if (!thumbnail) return;
        const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
        uploadBytes(imageRef, thumbnail).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                updateBlog(url);
            });
        });
    };

    const updateBlog = async (thumbnailUrl) => {
        const blogRef = doc(fireDb, "blogPost", id);
        try {
            await updateDoc(blogRef, {
                blogs,
                thumbnail: thumbnailUrl,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            });
            navigate('/dashboard');
            toast.success('Post Updated Successfully');
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    function createMarkup(c) {
        return { __html: c };
    }

    return (
        <div className='container mx-auto max-w-5xl py-6'>
            <div className="p-5" style={{
                background: mode === 'dark'
                    ? '#353b48'
                    : 'rgb(226, 232, 240)',
                borderBottom: mode === 'dark'
                    ? ' 4px solid rgb(226, 232, 240)'
                    : ' 4px solid rgb(30, 41, 59)'
            }}>
                <div className="mb-2 flex justify-between">
                    <div className="flex gap-2 items-center">
                        <Link to={'/dashboard'}>
                            <BsFillArrowLeftCircleFill size={25} />
                        </Link>
                        <Typography
                            variant="h4"
                            style={{
                                color: mode === 'dark'
                                    ? 'white'
                                    : 'black'
                            }}
                        >
                            Edit blog
                        </Typography>
                    </div>
                </div>
                <div className="mb-3">
                    {thumbnail ? (
                        <img className="w-full rounded-md mb-3"
                            src={URL.createObjectURL(thumbnail)}
                            alt="thumbnail"
                        />
                    ) : (
                        <img className="w-full rounded-md mb-3"
                            src={existingThumbnail}
                            alt="thumbnail"
                        />
                    )}
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-semibold"
                        style={{ color: mode === 'dark' ? 'white' : 'black' }}
                    >
                        Upload Thumbnail
                    </Typography>
                    <input
                        type="file"
                        label="Upload thumbnail"
                        className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        onChange={(e) => setThumbnail(e.target.files[0])}
                    />
                </div>
                <div className="mb-3">
                    <input
                        label="Enter your Title"
                        className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${mode === 'dark'
                                ? 'placeholder-black'
                                : 'placeholder-black'}`}
                        placeholder="Enter Your Title"
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        name="title"
                        value={blogs.title}
                        onChange={(e) => setBlogs({ ...blogs, title: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        label="Enter your Category"
                        className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${mode === 'dark'
                                ? 'placeholder-black'
                                : 'placeholder-black'}`}
                        placeholder="Enter Your Category"
                        style={{
                            background: mode === 'dark'
                                ? '#dcdde1'
                                : 'rgb(226, 232, 240)'
                        }}
                        name="category"
                        value={blogs.category}
                        onChange={(e) => setBlogs({ ...blogs, category: e.target.value })}
                    />
                </div>
                <Editor
                    apiKey='xoforcg13klhy70dw8fju9ddb2ief5i6nt0c4li3ru9f3p9h'
                    value={blogs.content}
                    onEditorChange={(newValue, editor) => {
                        setBlogs({ ...blogs, content: newValue });
                    }}
                    init={{
                        plugins: 'a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template  tinydrive tinymcespellchecker typography visualblocks visualchars wordcount'
                    }}
                />
                <Button className="w-full mt-5"
                    onClick={updatePost}
                    style={{
                        background: mode === 'dark'
                            ? 'rgb(226, 232, 240)'
                            : 'rgb(30, 41, 59)',
                        color: mode === 'dark'
                            ? 'rgb(30, 41, 59)'
                            : 'rgb(226, 232, 240)'
                    }}
                >
                    Update
                </Button>
                <div className="">
                    <h1 className="text-center mb-3 text-2xl">Preview</h1>
                    <div className="content">
                        <div
                            className={`
                        [&> h1]:text-[32px] [&>h1]:font-bold  [&>h1]:mb-2.5
                        ${mode === 'dark' ? '[&>h1]:text-[#ff4d4d]' : '[&>h1]:text-black'}
                        [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5
                        ${mode === 'dark' ? '[&>h2]:text-white' : '[&>h2]:text-black'}
                        [&>h3]:text-[18.72] [&>h3]:font-bold [&>h3]:mb-2.5
                        ${mode === 'dark' ? '[&>h3]:text-white' : '[&>h3]:text-black'}
                        [&>h4]:text-[16px] [&>h4]:font-bold [&>h4]:mb-2.5
                        ${mode === 'dark' ? '[&>h4]:text-white' : '[&>h4]:text-black'}
                        [&>h5]:text-[13.28px] [&>h5]:font-bold [&>h5]:mb-2.5
                        ${mode === 'dark' ? '[&>h5]:text-white' : '[&>h5]:text-black'}
                        [&>h6]:text-[10px] [&>h6]:font-bold [&>h6]:mb-2.5
                        ${mode === 'dark' ? '[&>h6]:text-white' : '[&>h6]:text-black'}
                        [&>p]:text-[16px] [&>p]:mb-1.5
                        ${mode === 'dark' ? '[&>p]:text-[#7efff5]' : '[&>p]:text-black'}
                        [&>ul]:list-disc [&>ul]:mb-2
                        ${mode === 'dark' ? '[&>ul]:text-white' : '[&>ul]:text-black'}
                        [&>ol]:list-decimal [&>li]:mb-10
                        ${mode === 'dark' ? '[&>ol]:text-white' : '[&>ol]:text-black'}
                        [&>li]:list-decimal [&>ol]:mb-2
                        ${mode === 'dark' ? '[&>ol]:text-white' : '[&>ol]:text-black'}
                        [&>img]:rounded-lg
                        `}
                            dangerouslySetInnerHTML={createMarkup(blogs.content)}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBlog;
