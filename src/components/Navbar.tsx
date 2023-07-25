import {AiOutlineMenu} from 'react-icons/ai'
import {IoMdClose} from 'react-icons/io'
import {useState, useCallback} from 'react'
import Link from "next/link";
import {getNavbarPages, getPageWithHash, Page, pages} from "~/constants";
import {useRouter} from "next/router";
import {twMerge} from "tailwind-merge";
import Button, {ButtonLink} from "~/components/Button";
import {motion} from "framer-motion";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={"pb-24 md:pb-28 lg:pb-4 mb-12"}>
      <nav id="header" className="absolute z-10 w-full px-3 font-sans text-white lg:static">
        <div
          className={twMerge(
            "w-full mt-3 px-4 container mx-auto",
            "max-w-6xl lg:flex flex-wrap items-center",
            "justify-between py-2 lg:py-0 md:mt-5",
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

            <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
              <ButtonLink href={getPageWithHash(pages.about, pages.about.joinId)} className={"py-1"} style={"outline"}>
                Přidejte se k nám
              </ButtonLink>

              <ButtonLink href={getPageWithHash(pages.home, pages.home.donateId)} className={"py-1"}>
                Podpoř Vášeň ke čtení
              </ButtonLink>
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
      <img alt="Logo" className="ml-2 block max-h-[50px] md:max-h-[60px]" src="/logo.png"/>
    </Link>
  )
}

function MenuButton(props: { isMenuOpen: boolean, handleMenuClick: () => void }) {
  return (
    <button onClick={props.handleMenuClick} className="mr-5">
      {
        props.isMenuOpen
          ? <IoMdClose className="h-5 w-5 text-black"/>
          : <AiOutlineMenu className="h-5 w-5 text-black"/>
      }
    </button>
  )
}

function NavItemList() {
  return (
    <ul className="items-center justify-between gap-1 list-reset lg:flex">
      {
        getNavbarPages().map((page) => (
          <li key={page.path}>
            <NavItem page={page} key={page.path}/>
          </li>
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
  )
}

export default Navigation
