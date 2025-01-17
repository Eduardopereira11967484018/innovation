import { styled } from '../context/vstitches.config'
import { Search, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const HeaderContainer = styled('header', {
  backgroundColor: '$primary',
  padding: '1rem',
  color: 'white',
})

const HeaderContent = styled('div', {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
})

const SearchContainer = styled('div', {
  flex: 1,
  maxWidth: '600px',
  position: 'relative',
})

const SearchInput = styled('input', {
  width: '100%',
  padding: '0.75rem 1rem',
  paddingRight: '3rem',
  borderRadius: '50px',
  border: 'none',
  outline: 'none',
})

const SearchButton = styled('button', {
  position: 'absolute',
  right: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  color: '$primary',
  cursor: 'pointer',
})

const IconsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
})

const IconWrapper = styled('div', {
  position: 'relative',
  cursor: 'pointer',
})

const Badge = styled('span', {
  position: 'absolute',
  top: '-8px',
  right: '-8px',
  background: 'white',
  color: '$primary',
  borderRadius: '50%',
  padding: '2px 6px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
})

const UserContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
})

const UserInfo = styled('div', {
  textAlign: 'right',
})

const UserName = styled('div', {
  fontWeight: 'bold',
})

const UserEmail = styled('div', {
  fontSize: '0.875rem',
  opacity: 0.9,
})

const Avatar = styled('div', {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  overflow: 'hidden',
  border: '2px solid white',
  position: 'relative',
})

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Link href="/">
          <Image
            src="/imagem.webp"
            alt="Innovation Brindes"
            width={180}
            height={40}
            style={{ objectFit: 'contain' }}
          />
        </Link>

        <SearchContainer>
          <SearchInput type="text" placeholder="Pesquisar" />
          <SearchButton>
            <Search size={20} />
          </SearchButton>
        </SearchContainer>

        <IconsContainer>
          <IconWrapper>
            <Mail size={24} />
            <Badge>11</Badge>
          </IconWrapper>
          <IconWrapper>
            <Phone size={24} />
            <Badge>11</Badge>
          </IconWrapper>
        </IconsContainer>

        <UserContainer>
          <UserInfo>
            <UserName>Eduardo Pereira</UserName>
            <UserEmail>eduardopereira.lima@yahoo.com</UserEmail>
          </UserInfo>
          <Avatar>
            <Image
              src="/placeholder.svg"
              alt="User Avatar"
              fill
              style={{ objectFit: 'cover' }}
            />
          </Avatar>
        </UserContainer>
      </HeaderContent>
    </HeaderContainer>
  )
}

