import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import {
  Upload,
  ShieldCheck,
  Share2,
  Zap,
  Folder,
  HardDrive,
  Smartphone,
  Code,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const steps = [
    {
      title: "Step 1 — Select File",
      description: "Choose the file you want to upload from your device.",
      icon: Upload,
    },
    {
      title: "Step 2 — Upload Securely",
      description:
        "Our system securely uploads your file using optimized transfer technology.",
      icon: ShieldCheck,
    },
    {
      title: "Step 3 — Manage & Share",
      description: "Access, manage, or share your files anytime with ease.",
      icon: Share2,
    },
  ];

  const features = [
    {
      title: "High-Speed Uploads",
      description:
        "Experience ultra-fast file uploads powered by optimized cloud infrastructure and smart chunking technology.",
      icon: Zap,
    },
    {
      title: "Secure Storage",
      description:
        "Your files are protected with advanced encryption and secure access controls to keep your data safe.",
      icon: ShieldCheck,
    },
    {
      title: "Easy File Management",
      description:
        "Organize, preview, rename, and delete files effortlessly through a clean and intuitive dashboard.",
      icon: Folder,
    },
    {
      title: "Large File Support",
      description:
        "Upload large files without worry using our reliable chunk upload system.",
      icon: HardDrive,
    },
    {
      title: "Anywhere Access",
      description:
        "Access your files anytime from any device — desktop, tablet, or mobile.",
      icon: Smartphone,
    },
    {
      title: "Developer Friendly",
      description:
        "Built with modern APIs and scalable architecture, perfect for developers and teams.",
      icon: Code,
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <div className="flex-1 h-screen flex-col w-screen">
        {/* Hero Section */}
        <div className="flex flex-col py-14 items-center justify-center">
          <h2 className="text-3xl sm:text-6xl text-center my-5">
            Secure. Fast. Reliable File Uploads.
          </h2>
          <p className="text-center">
            Upload, store, and manage your files with confidence. Our platform
            provides lightning-fast uploads, strong security, and seamless
            access anytime, anywhere.
          </p>
          <span className="flex w-full items-center justify-center gap-8 my-10">
            <Button
              className="py-5"
              onClick={() => {
                navigate("/login");
              }}
            >
              Upload Files
            </Button>
            <Button
              className="py-5"
              onClick={() => {
                navigate("/register");
              }}
            >
              Create Account
            </Button>
          </span>
        </div>
        {/* Features section */}
        <div className="flex flex-col py-14 items-center justify-center">
          <h2 className="text-3xl sm:text-4xl text-center my-5">
            Why Choose Our Platform?
          </h2>
          <span className="flex items-center gap-4 justify-between flex-wrap p-5">
            {features.map((features, index) => (
              <Card
                key={index}
                className="w-96 p-5 cursor-pointer shadow-sm hover:shadow-md transition"
              >
                <CardHeader className="flex flex-col items-center text-center">
                  <features.icon className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>{features.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {features.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </span>
        </div>
        {/* How it Works section */}
        <div className="flex flex-col py-14 items-center justify-center">
          <h2 className="text-3xl sm:text-4xl text-center my-5">
            Upload in 3 Simple Steps
          </h2>
          <span className="flex gap-4 justify-between flex-wrap p-5">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <CardHeader className="flex flex-col items-center text-center">
                  <step.icon className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </span>
        </div>
        {/* trust/stats section */}
        {/* call to action section */}
        <div className="flex flex-col items-center justify-center gap-8 py-14">
          <h2 className="text-3xl sm:text-4xl text-center my-5">
            Start Uploading Your Files Today
          </h2>
          <p className="text-center">
            Join our platform and experience smooth, secure, and powerful file
            management.
          </p>
          <Button
            className="py-5"
            onClick={() => {
              navigate("/register");
            }}
          >
            Get Started Free
          </Button>
        </div>
        {/* footer about section */}
        <div className="py-10 flex flex-col justify-center items-center bg-black">
          <h2 className="text-center text-wrap font-bold text-white">
            Our File Upload platform is designed to provide secure, scalable,
            and high-performance file handling for individuals, developers, and
            businesses.
          </h2>
          <p className="text-sm text-muted-foreground text-center my-4 font-bold">
            © 2026 FileUpload. Created by Shubhankar Marathe.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
