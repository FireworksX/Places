import { FC } from 'react'
import * as Styled from './styles'
import Container from 'src/components/Container/Container'
import { useWelcomeCode } from './hooks/useWelcomeCode'
import PageHeaderButton from 'src/widgets/PageHeader/components/PageHeaderButton/PageHeaderButton'
import { CodeValue } from './styles'
import { useTimeout } from 'react-use'

interface WelcomeRegisterProps {
  className?: string
  onBack(): void
  onLogin(): void
  onRegister(): void
}

const WelcomeCode: FC<WelcomeRegisterProps> = ({ className, onLogin, onRegister, onBack }) => {
  const { phone, codeValue, generatedCode, onSetCodeValue } = useWelcomeCode({ onLogin, onRegister, onBack })

  const [isReady] = useTimeout(1000)

  return (
    <Styled.Root className={className}>
      <Container>
        <Styled.Header left={<PageHeaderButton onClick={onBack}>Back</PageHeaderButton>} />
        <Styled.Title>{phone}</Styled.Title>
        <Styled.Description>Мы отправили вам СМС с кодом подтверждения</Styled.Description>
        <Styled.CodeInput value={codeValue} onChange={e => onSetCodeValue(e.target.value)} />

        {isReady() && (
          <Styled.CodePlaceholder>
            На самом деле не отправили) Вот ваш код:
            <Styled.CodeValue>{generatedCode}</Styled.CodeValue>
          </Styled.CodePlaceholder>
        )}
      </Container>
    </Styled.Root>
  )
}

export default WelcomeCode
