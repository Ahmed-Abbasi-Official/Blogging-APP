import Image from "../utils/Image.jsx";
import Button from "../utils/Button.jsx";
import PostMenuActions from "../components/PostMenuActions.jsx";
import Search from "../components/Search.jsx";
import Comments from "../components/Comments.jsx";

const SinglePostPage = () => {
  return (
    <div className="flex gap-8 flex-col">
      {/* DETAILS */}
      <div className="flex gap-8">
        {/* DETAILS */}
        <div className="lg:w-3/5  flex-col flex gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            consequatur,
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Button containerClass="text-blue-800" value="John Doe" />
            <span>on</span>
            <Button containerClass="text-blue-800" value="Web Designe" />
            <span>2 days ago</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            perspiciatis obcaecati aliquam exercitationem debitis, corporis
            maxime rem provident maiores? Doloribus nemo eos sit dolores nulla
            dolorem dicta illum at placeat!
          </p>
          <Button value="Read More" containerClass="underline text-blue-800" />
        </div>
        {/* IMAGE */}
        <div className="hidden lg:block w-2/5">
          <Image
            src="Blogging%20Website/postImg.jpeg"
            alt="SingleImage"
            className="rounded-xl"
            // w={600}
          />
        </div>
      </div>
      {/* CONTENT */}
      <div className="flex md:flex-row flex-col gap-8">
        {/* TEXT */}
        <div className="flex flex-col gap-6 lg:text-lg text-justify">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
            temporibus consequuntur exercitationem labore consequatur
            necessitatibus debitis, sint sed et a alias id accusantium ducimus
            itaque nihil? Ullam possimus cumque molestiae earum sunt repellendus
            sit voluptas quo eaque, est omnis. Eum eaque ipsa tempore doloremque
            nobis maiores sequi ab, in asperiores illo totam et reprehenderit
            illum cumque officia voluptas dolor ut laboriosam. In veniam
            perspiciatis facere itaque excepturi nisi ex esse.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
            temporibus consequuntur exercitationem labore consequatur
            necessitatibus debitis, sint sed et a alias id accusantium ducimus
            itaque nihil? Ullam possimus cumque molestiae earum sunt repellendus
            sit voluptas quo eaque, est omnis. Eum eaque ipsa tempore doloremque
            nobis maiores sequi ab, in asperiores illo totam et reprehenderit
            illum cumque officia voluptas dolor ut laboriosam. In veniam
            perspiciatis facere itaque excepturi nisi ex esse.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
            temporibus consequuntur exercitationem labore consequatur
            necessitatibus debitis, sint sed et a alias id accusantium ducimus
            itaque nihil? Ullam possimus cumque molestiae earum sunt repellendus
            sit voluptas quo eaque, est omnis. Eum eaque ipsa tempore doloremque
            nobis maiores sequi ab, in asperiores illo totam et reprehenderit
            illum cumque officia voluptas dolor ut laboriosam. In veniam
            perspiciatis facere itaque excepturi nisi ex esse.
          </p>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8 ">
          <h1  className="font-medium  mb-4 text-sm">Author</h1>
          <div className="flex  flex-col gap-4">
          <div className="flex  items-center gap-8">
            <Image
            src='Blogging%20Website/userImg.jpeg'
            className='w-12 h-12 rounded-full object-cover'
            w={48}
            h={48}
            />
            <Button
            value='John Doe'
            />
            </div>
            <p className="text-sm text-gray-500">Lorem, ipsum dolor sit amet consectetur</p>
            <div className="flex gap-2">
            <Button
            value={<Image
            src='Blogging%20Website/facebook.svg'
            alt='Facebook'
            />}
            />
            <Button
            value={<Image
            src='Blogging%20Website/instagram.svg'
            alt='Insta'
            />}
            />
            </div>
            </div>
          <PostMenuActions/>
          <h1  className="font-medium mt-8 mb-4 text-sm">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Button
            value='All'
            containerClass='underline'
            />
            <Button
            value='Web Design'
            to='/'
            containerClass='underline'
            />
            <Button
            value='Development'
            to='/'
            containerClass='underline'
            />
            <Button
            value='Database'
            to='/'
            containerClass='underline'
            />
            <Button
            value='Search Engines'
            to='/'
            containerClass='underline'
            />
            <Button
            value='Marketing'
            to='/'
            containerClass='underline'
            />
          </div>
          <h1 className="font-medium mt-8 mb-4 text-sm">Search</h1>
          <Search/>
        </div>
      </div>
      <Comments/>
    </div>
  );
};

export default SinglePostPage;
