import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Upload_Files = () => {
  const filesData = [
    {
      _id: 1,
      filename: "project-report.pdf",
      type: "PDF",
      datetime: "2026-02-25 10:30 AM",
      size: "2.4 MB",
    },
    {
      _id: 2,
      filename: "profile-photo.png",
      type: "Image",
      datetime: "2026-02-24 04:15 PM",
      size: "1.2 MB",
    },
    {
      _id: 3,
      filename: "lecture-notes.docx",
      type: "Document",
      datetime: "2026-02-23 09:05 AM",
      size: "856 KB",
    },
    {
      _id: 4,
      filename: "demo-video.mp4",
      type: "Video",
      datetime: "2026-02-22 07:40 PM",
      size: "24.8 MB",
    },
    {
      _id: 5,
      filename: "archive-backup.zip",
      type: "Archive",
      datetime: "2026-02-21 01:20 PM",
      size: "12.6 MB",
    },
  ];

  const [FileArray, SetFileArray] = useState<FileList | null>();

  const OnChangeFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    SetFileArray(e.target.files);
  };

  return (
    <>
      <div className="flex-1 flex flex-col justify-center items-center w-full my-5">
        <h2 className="text-2xl font-bold mb-6">Upload Your Files</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          encType="multipart/form-data"
        >
          <Field className="w-96">
            <FieldLabel htmlFor="picture">Files</FieldLabel>
            <Input
              id="picture"
              type="file"
              multiple={true}
              onChange={OnChangeFileInput}
            />
            <FieldDescription>Select a Files to upload.</FieldDescription>
          </Field>
          <Button className="my-5" type="submit">
            Upload
          </Button>
        </form>
      </div>
      <div className="flex-1 flex flex-col  w-full my-10">
        <h2 className="text-left text-2xl my-3">Recent Uploads</h2>
        <Table>
          <TableCaption>A list of Recent uploads files</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Filename</TableHead>
              <TableHead>type</TableHead>
              <TableHead>DateTime</TableHead>
              <TableHead className="text-right">Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-auto">
            {filesData.map((val) => {
              return (
                <TableRow key={val._id}>
                  <TableCell className="font-medium">{val.filename}</TableCell>
                  <TableCell>{val.type}</TableCell>
                  <TableCell>{val.datetime}</TableCell>
                  <TableCell className="text-right">{val.size}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Upload_Files;
