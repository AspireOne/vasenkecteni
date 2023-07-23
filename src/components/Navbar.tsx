import {AiOutlineMenu} from 'react-icons/ai'
import {IoMdClose} from 'react-icons/io'
import {useState, useCallback} from 'react'
import Link from "next/link";
import {Page, pages} from "~/constants";
import {useRouter} from "next/router";
import {twMerge} from "tailwind-merge";
import Button from "~/components/Button";
import {motion} from "framer-motion";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={"pb-24 md:pb-28 lg:pb-4"}>
      <nav id="header" className="w-full z-10 text-white font-sans px-3 lg:static lg:ml-0 -ml-4 absolute">
        <div
          className={twMerge(
            "w-full mt-3 px-4 container mx-auto",
            "xl:max-w-5xl lg:flex flex-wrap items-center",
            "justify-between py-2 md:mt-5",
            "bg-emerald-50 lg:rounded-full",
            isMenuOpen ? 'rounded-3xl' : 'rounded-full')
          }
        >
          <div className="ml-2 flex items-center justify-between lg:hidden">
            <Logo/>
            <MenuButton isMenuOpen={isMenuOpen} handleMenuClick={toggleMenu}/>
          </div>

          <div
            className={twMerge(
              "w-full flex-grow lg:flex justify-between lg:items-center",
              "lg:w-auto mt-2 lg:mt-0 text-lg lg:bg-transparent",
              "text-black p-3 z-20",
              isMenuOpen ? '' : 'hidden'
            )}
            id="nav-content"
          >

            <Logo className={"hidden lg:block"}/>
            <NavItemList/>

            <div className="flex gap-2 flex-wrap sm:mt-0 mt-4">
              <Button  style={"outline"}>Přidejte se k nám</Button>
              <Button >Podpoř Vášeň ke čtení</Button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

function Logo(props: {className?: string}) {
  return (
    <Link href="/" className={twMerge("hover:no-underline", props.className)}>
      <img alt="Logo" className="block max-h-[50px] md:max-h-[60px] ml-2" src="/logo.png"/>
    </Link>
  )
}

function MenuButton(props: { isMenuOpen: boolean, handleMenuClick: () => void }) {
  return (
    <button onClick={props.handleMenuClick} className="mr-5">
      {
        props.isMenuOpen
          ? <IoMdClose className="text-black h-5 w-5"/>
          : <AiOutlineMenu className="text-black h-5 w-5"/>
      }
    </button>
  )
}

function NavItemList() {
  return (
    <ul className="list-reset lg:flex items-center justify-between gap-1">
      {
        Object.values(pages).map((page) => (
          <NavItem page={page}/>
        ))
      }
    </ul>
  )
}

function NavItem(props: { page: Page }) {
  const router = useRouter()
  const isActive = router.pathname === props.page.path;

  const activeStyle = {
    scaleX: 1,
    transition: {
      duration: 0.3,
      type: 'spring',
      damping: 20,
      stiffness: 300
    }
  };

  const inactiveStyle = {
    scaleX: 0,
    transition: {
      duration: 0.3,
      type: 'spring',
      damping: 20,
      stiffness: 300
    }
  };

  return (
    <li key={props.page.path}>
      <Link
        className={
          twMerge(
            "inline-block text-gray-700",
            "no-underline hover:text-gray-800," +
            "hover:text-underline py-2 px-4 text-brand-800 font-semibold",
            isActive ? "font-bold" : "")}
        href={props.page.path}
      >
        {props.page.title}
        <motion.div
          className="h-1 bg-brand-700"
          style={{ originX: 0 }}
          initial={inactiveStyle}
          animate={isActive ? activeStyle : inactiveStyle}
        />
      </Link>
    </li>
  )
}

export default Navigation
