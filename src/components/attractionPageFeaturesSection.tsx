import AttractionSpecsCard from "./attractionSpecsCard"
export default function AttractionPageFeaturesSection() {
    return (
        <section className="z-30 relative bottom-[125px] lg:bottom-[40px] flex flex-col lg:flex-row  flex-wrap items-center justify-center rounded-[24px] gap-[16px] lg:gap-[24px]">
            <AttractionSpecsCard />
            <AttractionSpecsCard />
            <AttractionSpecsCard />
            <AttractionSpecsCard />
        </section>
    )
}