import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="f">
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}