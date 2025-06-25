
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PostForm } from "@/pages/Post/PostForm";
import { AuthContext, IAuthProvider } from "nauth-core";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import IPostProvider from "@/Contexts/Post/IPostProvider";
import PostContext from "@/Contexts/Post/PostContext";
import { toast } from "sonner";
import PostInfo from "@/DTO/Domain/PostInfo";
import PostStatusEnum from "@/DTO/Enum/PostStatusEnum";
import PostTypeEnum from "@/DTO/Enum/PostTypeEnum";


export default function Post() {

  const navigate = useNavigate();

  const { postId } = useParams<"postId">();

  const authContext = useContext<IAuthProvider>(AuthContext);
  const postContext = useContext<IPostProvider>(PostContext);


  useEffect(() => {
    authContext.loadUserSession().then((ret) => {
      if (!authContext.sessionInfo) {
        navigate("/login");
        return;
      }
      let post: PostInfo = {
        postId: parseInt(postId || "0"),
        networkId: 0,
        clientId: 0,
        title: "",
        description: "",
        mediaUrl: "",
        scheduleDate: new Date().toDateString(),
        postType: PostTypeEnum.Post,
        status: PostStatusEnum.Draft
      };
      postContext.setPost(post);
      postContext.setImageUrl("");
      let postIdNum: number = parseInt(postId || "0");
      if (postIdNum > 0) {
        postContext.getById(postIdNum).then((retPost) => {
          if (!retPost.sucesso) {
            toast.error(retPost.mensagemErro);
            return;
          }
        });
      }
    })
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-dark">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center mb-8">
              <Link to="/posts">
                <Button variant="ghost" className="text-gray-300 hover:text-black mr-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">{postId ? "Edit Post" : "Create New Post"}</h1>
                <p className="text-gray-400">Schedule your content across social platforms</p>
              </div>
            </div>
            <PostForm
              loading={postContext.loading}
              post={postContext.post}
              setPost={postContext.setPost}
              onSave={async (postData: PostInfo) => {

                const localDate = new Date(postData.scheduleDate); // Date from picker
                const utcDate = new Date(
                  localDate.getTime() - localDate.getTimezoneOffset() * 60000
                );
                postData = {
                  ...postData,
                  scheduleDate: utcDate.toISOString(),
                  postType: PostTypeEnum.Post, 
                }

                if (postData.postId > 0) {
                  let ret = await postContext.update(postData);
                  if (!ret.sucesso) {
                    toast.error(ret.mensagemErro);
                    return;
                  }
                }
                else {
                  let ret = await postContext.insert(postData);
                  if (!ret.sucesso) {
                    toast.error(ret.mensagemErro);
                    return;
                  }
                }
                toast.success("Post scheduled successfully!");
              }}
            />
          </div>
        </main>
      </div >
    </SidebarProvider >
  );
};
