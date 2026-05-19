'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Article } from "@/utils/types";

export default function ExploreDubaiSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('article')
      .select('*')
      .order('published_date', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching articles:', error);
    } else if (data) {
      console.log(data);
      setArticles(data as Article[]);
    }
    setLoading(false);
  };

  const handleNext = () => {
    if (currentIndex < articles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentArticle = articles[currentIndex];
  const articleSlug = currentArticle?.title?.toString().replace(/ /g, "-") || '';

  if (loading) {
    return (
      <section className="flex flex-col items-center w-full justify-center bg-white py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </section>
    );
  }

  if (!currentArticle) {
    return (
      <section className="flex flex-col items-center w-full justify-center bg-white py-20">
        <p className="text-gray-600">No articles available</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center w-full justify-center bg-white">
      <div className="flex flex-col items-start mb-[30px] justify-center w-full  px-[20px] lg:px-[140px] z-50">
        <h2 className="heading-2">Ready to </h2>
        <h2 className="stylish-yellow-text">Explore Dubai</h2>
      </div>
      <section className="flex flex-col md:flex-row items-center w-full relative justify-center">
        <section className="flex flex-col items-start w-full relative justify-center pr-[20px] sm:pr-[0px]">
          <Image
            src={currentArticle.images?.[0] || "/background-images/explore-dubai.svg"}
            width={600}
            height={450}
            className="rounded-tr-[18px] object-cover w-full sm:w-[500px] md:w-[550px] lg:w-[600px] xl:w-[700px] 2xl:w-auto h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:min-h-[720px] z-20 "
            alt={currentArticle.title}
          />
          <section className="absolute inset-0 w-full overflow-hidden min-h-[200px]  top-50 md:top-[300px] lg:top-[370px] xl:top-[400px] 2xl:top-[600px] z-20 pointer-events-none">
            <div className="absolute inset-0 flex flex-row items-center justify-start gap-[5px] *:top-2">
              <Image
                src={"/clouds/cloud.svg"}
                width={400}
                height={200}
                className="absolute left-[-38px] bottom-1 top-2 w-[400px] h-[200px]"
                alt=""
              />
              <Image
                src={"/clouds/cloud.svg"}
                width={400}
                height={200}
                className="absolute left-[-38px] bottom-8 top-2 w-[400px] h-[200px]"
                alt=""
              />
              <Image
                src={"/clouds/cloud.svg"}
                width={400}
                height={200}
                className="absolute left-[-38px] bottom-8 w-[400px] h-[200px]"
                alt=""
              />

              <Image
                src={"/clouds/cloud.svg"}
                width={400}
                height={200}
                className="absolute left-[-16px] bottom-8 w-[400px] h-[200px]"
                alt=""
              />

              <Image
                src={"/clouds/cloud.svg"}
                width={400}
                height={200}
                className="absolute left-40 bottom-8 w-[400px] h-[200px]"
                alt=""
              />

              <Image
                src={"/clouds/cloud.svg"}
                width={400}
                height={200}
                className="absolute left-[450px] bottom-8 w-[400px] h-[200px]"
                alt=""
              />
              <Image
                src={"/clouds/cloud.svg"}
                width={400}
                height={200}
                className="absolute left-[5px] bottom-8 w-[400px] h-[200px]"
                alt=""
              />
              <Image
                src={"/clouds/cloud.svg"}
                width={400}
                height={200}
                className="absolute left-[450px] bottom-8 w-[400px] h-[200px]"
                alt=""
              />
            </div>
          </section>

          <section className="absolute w-full top-12 min-h-[760px] md:hidden">
            <Image
              src="/background-images/explore-dubai-background-effect.png"
              width={1200}
              height={600}
              className="absolute w-full min-h-[760px] h-full z-0"
              alt=""
            />

            {/* gradient overlay above image */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_45%,_rgba(255,255,255,0)_50%,_rgba(255,255,255,1)_100%)]"></div>
          </section>
        </section>
        <section className="flex flex-col-reverse md:flex-col items-center justify-center w-full">
          <section className="flex flex-col items-start justify-center pl-8 pt-7 relative z-40 font-inter font-normal text-[14px] text-[#0066CA] sm:text-[22px] leading-[35px] tracking-[-0.02em]">
            <Image src={"/images/piegon.svg"} width={150} height={150} className="2xl:block hidden absolute top-[-30px] w-[320px] top-0 right-[20px]" alt="" />
            <Image src={"/images/piegon.svg"} width={150} height={150} className="2xl:block hidden  absolute w-[170px]  right-[20px]" alt="" />

            <h4 className="font-inter font-normal text-[22px] leading-[35px] tracking-[-0.02em]">
              Date : {new Date(currentArticle.published_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')}{" "}
            </h4>
            <h3 className="text-[#112259] font-inter font-semibold text-[28px] md:text-[45px] leading-[100%] tracking-[-0.02em]">
              {currentArticle.title}
            </h3>
            <p className="text-black py-[30px] font-inter font-normal text-[16px] md:text-[22px] leading-[25px] md:leading-[35px] tracking-[-0.02em]">
              {currentArticle.paras?.[0]?.substring(0, 250)}...
            </p>
            <Link href={`/article/${articleSlug}`} className="flex flex-row items-center justify-center rounded-[39px] bg-[#F8A900] text-black px-[25px] py-[15px] font-inter font-semibold text-[16px] sm:text-[20px] leading-[23.28px] tracking-[-0.02em]">
              View Details
            </Link>
          </section>
          <section className="absolute inset-0 w-full h-[400px] lg:h-[500px] overflow-hidden hidden md:block">
            <Image
              src="/background-images/explore-dubai-background-effect.png"
              width={1200}
              height={600}
              alt=""
              className="w-full h-full object-cover absolute bottom-0 z-0"
            />

            {/* gradient overlay */}
            <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_45%,rgba(255,255,255,0)_50%,rgba(255,255,255,1)_100%)]"></div>
          </section>

          {/* this one for large screens */}
          <section className="relative w-full flex flex-row items-center justify-start gap-[11px] lg:right-[100px] hidden md:block">
            <div className="relative z-30 flex flex-row mt-[18px]  items-center justify-start pl-8  gap-[11px] w-fit">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`rotate-180 left-4 absolute w-[50px] h-[50px] p-4 bg-[#F8A900] border-[1.57px] border-white rounded-full flex flex-row items-center justify-center ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#e09800]'}`}
              >
                <Image
                  src={"/icons/right.svg"}
                  width={19.78}
                  height={15.35}
                  alt=""
                  className="w-full h-full"
                />
              </button>
              {articles.slice(currentIndex, currentIndex + 1).map((article, idx) => (
                <div key={article.article_id} className="flex flex-row items-center justify-center gap-[11px]">
                  <Image
                    src={article.images?.[1] || "/background-images/explore-dubai.svg"}
                    className="min-w-[258px] 2xl:min-w-[328px] 2xl:min-h-[258px] min-h-[223px] rounded-[20px] object-cover"
                    width={328}
                    height={258}
                    alt={article.title}
                  />
                  <Image
                    src={article.images?.[2] || "/background-images/explore-dubai.svg"}
                    className="min-w-[258px] 2xl:min-w-[328px] 2xl:min-h-[258px] min-h-[223px] rounded-[20px] object-cover"
                    width={328}
                    height={258}
                    alt={article.title}
                  />
                </div>
              ))}

              <button
                onClick={handleNext}
                disabled={currentIndex >= articles.length - 1}
                className={`right-[-8px] absolute  w-[50px] h-[50px] p-4 bg-[#F8A900] border-[1.57px] border-white rounded-full flex flex-row items-center justify-center ${currentIndex >= articles.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#e09800]'}`}
              >
                <Image
                  src={"/icons/right.svg"}
                  width={19.78}
                  height={15.35}
                  alt=""
                  className="w-full h-full"
                />
              </button>
            </div>
          </section>

          {/* bottom one for phone screens */}

          <section className="relative w-full flex flex-row items-center justify-start overflow-hidden gap-[11px] md:right-[100px] block md:hidden overflow-x-hidden">
            <div className="relative z-30 flex flex-row mt-[18px] items-center justify-start pl-8 overflow-hidden gap-[11px]">
              {articles.slice(currentIndex, currentIndex + 1).map((article) => (
                <div key={article.article_id} className="flex flex-row items-center justify-center gap-[11px]">

                  <Image
                    src={article.images?.[0] || "/background-images/explore-dubai.svg"}
                    className="min-w-[158px] min-h-[123px] rounded-[10.72px] object-cover"
                    width={158}
                    height={123}
                    alt={article.title}
                  />
                  <Image
                    src={article.images?.[1] || "/background-images/explore-dubai.svg"}
                    className="min-w-[158px] min-h-[123px] rounded-[10.72px] object-cover"
                    width={158}
                    height={123}
                    alt={article.title}
                  />
                  <Image
                    src={article.images?.[2] || "/background-images/explore-dubai.svg"}
                    className="min-w-[158px] min-h-[123px] rounded-[10.72px] object-cover"
                    width={158}
                    height={123}
                    alt={article.title}
                  />
                </div>
              ))}
            </div>

            <div className="absolute flex flex-col gap-[10px] items-center justify-center left-[350px] z-30">
              <button
                onClick={handleNext}
                disabled={currentIndex >= articles.length - 1}
                className={`w-[30px] h-[30px] bg-[#F8A900] border-[1.57px] border-white rounded-full flex flex-row items-center justify-center ${currentIndex >= articles.length - 1 ? 'opacity-50' : ''}`}
              >
                <Image
                  src={"/icons/right.svg"}
                  width={9.78}
                  height={5.35}
                  alt=""
                  className="w-fit h-fit"
                />
              </button>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`rotate-180  flex flex-row items-center justify-center w-[30px] h-[30px] bg-[#F8A900] border-[1.57px] border-white rounded-full ${currentIndex === 0 ? 'opacity-50' : ''}`}
              >
                <Image
                  src={"/icons/right.svg"}
                  width={29.57}
                  height={29.57}
                  alt=""
                  className="w-fit h-fit"
                />
              </button>
            </div>

          </section>
        </section>
      </section>
    </section>
  );
}
