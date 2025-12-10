import React, { useEffect, useState } from 'react'
import './style.css'

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [phone, setPhone] = useState('')

  // Функция форматирования телефона: +7 (XXX) - XXX - XX - XX
  const formatPhone = (value: string): string => {
    // Удаляем все нецифровые символы
    let digits = value.replace(/\D/g, '')
    
    // Если начинается с 7 или 8, убираем первую цифру (будет добавлен +7)
    if (digits.startsWith('7')) {
      digits = digits.substring(1)
    } else if (digits.startsWith('8')) {
      digits = digits.substring(1)
    }
    
    // Ограничиваем до 10 цифр
    const limitedDigits = digits.substring(0, 10)
    
    // Форматируем: +7 (XXX) - XXX - XX - XX
    if (limitedDigits.length === 0) {
      return '+7'
    } else if (limitedDigits.length <= 3) {
      return `+7 (${limitedDigits}`
    } else if (limitedDigits.length <= 6) {
      return `+7 (${limitedDigits.substring(0, 3)}) - ${limitedDigits.substring(3)}`
    } else if (limitedDigits.length <= 8) {
      return `+7 (${limitedDigits.substring(0, 3)}) - ${limitedDigits.substring(3, 6)} - ${limitedDigits.substring(6)}`
    } else {
      return `+7 (${limitedDigits.substring(0, 3)}) - ${limitedDigits.substring(3, 6)} - ${limitedDigits.substring(6, 8)} - ${limitedDigits.substring(8)}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Если пользователь пытается удалить +7, не позволяем
    if (value.length < 2) {
      setPhone('+7')
      return
    }
    setPhone(formatPhone(value))
  }

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Разрешаем удаление, но не позволяем удалить +7
    if (e.key === 'Backspace' && phone.length <= 2) {
      e.preventDefault()
    }
  }

  const handlePhoneFocus = () => {
    // Если поле пустое, устанавливаем +7
    if (!phone || phone.length < 2) {
      setPhone('+7')
    }
  }

  useEffect(() => {
    // Блокировка скролла при открытом меню
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    // Анимации при скролле
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated')
        }
      })
    }, observerOptions)

    // Находим все элементы с классами анимаций
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in'
    )

    animatedElements.forEach((el) => {
      observer.observe(el)
    })

    // Анимация чисел в статистике
    const animateNumbers = () => {
      const statValue = document.querySelector('.hero-stat-value')
      if (statValue && statValue.textContent?.includes('+')) {
        const target = parseInt(statValue.textContent) || 250
        let current = 0
        const increment = target / 30
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          statValue.textContent = Math.floor(current) + '+'
        }, 50)
      }
    }

    // Запускаем анимацию чисел после небольшой задержки
    setTimeout(animateNumbers, 500)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="page">
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <header className="header">
        <div className="container header-inner">
          <div className="logo">
            <img src="/logo.jpg" alt="A2" className="logo-image" />
            <span className="logo-text">Авто в аренду для такси</span>
          </div>
          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            <a href="#tariffs" onClick={() => setMobileMenuOpen(false)}>Тарифы</a>
            <a href="#fleet" onClick={() => setMobileMenuOpen(false)}>Авто</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)}>Как это работает</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="#contacts" onClick={() => setMobileMenuOpen(false)}>Контакты</a>
            <div className="mobile-menu-cta">
              <a
                href="https://wa.me/+77003608822"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                WhatsApp
              </a>
              <a
                href="tel:+77003608822"
                className="btn btn-outline btn-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Позвонить
              </a>
            </div>
          </nav>
          <div className="header-cta">
            <a href="tel:+77003608822" className="btn btn-outline">
              Позвонить
            </a>
            <a
              href="https://wa.me/+77003608822"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              WhatsApp
            </a>
          </div>
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="top">
          <div className="container hero-inner">
            <div className="hero-content">
              <h1>
                Аренда АВТО под ТАКСИ <span className="accent">без депозита</span> и
                вложений
              </h1>
              <p className="hero-subtitle">
                Переходи на Comfort / Comfort+ / Business, зарабатывай больше. Более
                250 авто в парке, выдача от 24 часов, прозрачные условия.
              </p>
              <div className="hero-actions">
                <a
                  href="https://wa.me/+77003608822"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  Оставить заявку в WhatsApp
                </a>
                <a href="#tariffs" className="btn btn-ghost">
                  Смотреть тарифы
                </a>
              </div>
              <div className="hero-badges">
                <span>Без залога</span>
                <span>Без первоначального взноса</span>
                <span>Минимальный срок — 10 дней</span>
              </div>
            </div>
            <div className="hero-highlight animate-on-scroll scale-in">
              <div className="hero-stat">
                <span className="hero-stat-label">Авто в парке</span>
                <span className="hero-stat-value">250+</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-label">Выход на линию</span>
                <span className="hero-stat-value">от 24 часов</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-label">Средний доход</span>
                <span className="hero-stat-value">от 300 000 ₸/мес</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-label">Опыт на рынке</span>
                <span className="hero-stat-value">7 лет</span>
              </div>
            </div>
          </div>
        </section>

        {/* УТП блок */}
        <section className="section" id="benefits">
          <div className="container">
            <h2 className="section-title animate-on-scroll fade-in-up">Почему водители выбирают A2</h2>
            <div className="grid utp-grid">
              <div className="card utp-card animate-on-scroll fade-in-up">
                <div className="icon-circle">₸</div>
                <h3>Без залога и первоначального взноса</h3>
                <p>Начни зарабатывать уже завтра — без крупных вложений и рисков.</p>
              </div>
              <div className="card utp-card animate-on-scroll fade-in-up">
                <div className="icon-circle">🔧</div>
                <h3>ТО и ремонт — за наш счёт</h3>
                <p>Все плановые ТО, расходники и ремонты мы берём на себя.</p>
              </div>
              <div className="card utp-card animate-on-scroll fade-in-up">
                <div className="icon-circle">✅</div>
                <h3>Помощь с ИП и регистрацией</h3>
                <p>Оформление ИП за 15 минут и подключение к Яндекс.Такси без лишней бюрократии.</p>
              </div>
              <div className="card utp-card animate-on-scroll fade-in-up">
                <div className="icon-circle">👥</div>
                <h3>Акция «Приведи друга»</h3>
                <p>Приводи водителя по рекомендации и получай скидку с аренды.</p>
              </div>
              <div className="card utp-card animate-on-scroll fade-in-up">
                <div className="icon-circle">⏰</div>
                <h3>Гибкий график работы</h3>
                <p>Работай тогда, когда удобно — полный день, подработка или деление смены.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Тарифы */}
        <section className="section" id="tariffs">
          <div className="container">
            <h2 className="section-title animate-on-scroll fade-in-up">Тарифы аренды</h2>
            <p className="section-subtitle animate-on-scroll fade-in-up">
              Выбери комфортный класс — мы подберём подходящее авто и поможем выйти на линию.
            </p>
            <div className="grid tariffs-grid">
              <div className="card tariff-card animate-on-scroll fade-in-left">
                <div className="tariff-header">
                  <span className="tariff-badge">Comfort</span>
                  <h3>Для стабильного заработка</h3>
                </div>
                <div className="tariff-cars">
                  <div className="tariff-car-item">
                    <div className="tariff-image-placeholder">
                      <img src="/cars/hyundai-accent.jpg" alt="Hyundai Accent" className="tariff-image" />
                    </div>
                    <span className="tariff-car-name">Hyundai Accent 2022</span>
                  </div>
                </div>
                <ul className="tariff-list">
                  <li>Современные седаны на автомате</li>
                  <li>Расход топлива — оптимальный для работы в городе</li>
                  <li>Полное КАСКО и ОСАГО</li>
                  <li>ТО и ремонт включены</li>
                </ul>
                <div className="tariff-footer">
                  <div className="tariff-price">
                    <span className="label">от</span>
                    <span className="value">13 000 ₸ / день</span>
                  </div>
                  <a
                    href="https://wa.me/+77003608822?text=Хочу%20арендовать%20авто%20в%20тарифе%20Comfort"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-full"
                  >
                    Выбрать Comfort
                  </a>
                </div>
              </div>

              <div className="card tariff-card animate-on-scroll scale-in">
                <div className="tariff-header">
                  <span className="tariff-badge">Comfort+</span>
                  <h3>Больше заказов и дохода</h3>
                </div>
                <div className="tariff-cars">
                  <div className="tariff-car-item">
                    <div className="tariff-image-placeholder">
                      <img src="/cars/elantra.jpg" alt="Hyundai Elantra" className="tariff-image" />
                    </div>
                    <span className="tariff-car-name">Hyundai Elantra 2021–2024</span>
                  </div>
                  <div className="tariff-car-item">
                    <div className="tariff-image-placeholder">
                      <img src="/cars/byd-qin-plus.webp" alt="BYD Qin Plus" className="tariff-image" />
                    </div>
                    <span className="tariff-car-name">BYD Qin Plus 2023 (Electric)</span>
                  </div>
                  <div className="tariff-car-item">
                    <div className="tariff-image-placeholder">
                      <img src="/cars/tucson.webp" alt="Hyundai Tucson" className="tariff-image" />
                    </div>
                    <span className="tariff-car-name">Hyundai Tucson 2022</span>
                  </div>
                  <div className="tariff-car-item">
                    <div className="tariff-image-placeholder">
                      <img src="/cars/byd-destroyer.png" alt="BYD Destroyer" className="tariff-image" />
                    </div>
                    <span className="tariff-car-name">BYD Destroyer</span>
                  </div>
                  <div className="tariff-car-item">
                    <div className="tariff-image-placeholder">
                      <img src="/cars/honchi.webp" alt="Honchi" className="tariff-image" />
                    </div>
                    <span className="tariff-car-name">Honchi</span>
                  </div>
                </div>
                <ul className="tariff-list">
                  <li>Новые авто с улучшенной комплектацией</li>
                  <li>Повышенный спрос и средний чек</li>
                  <li>Приоритетные заказы в Яндекс.Такси</li>
                  <li>Поддержка 24/7</li>
                </ul>
                <div className="tariff-footer">
                  <div className="tariff-price">
                    <span className="label">от</span>
                    <span className="value">15 000 ₸ / день</span>
                  </div>
                  <a
                    href="https://wa.me/+77003608822?text=Хочу%20арендовать%20авто%20в%20тарифе%20Comfort%2B"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-full"
                  >
                    Выбрать Comfort+
                  </a>
                </div>
              </div>

              <div className="card tariff-card animate-on-scroll fade-in-right">
                <div className="tariff-header">
                  <span className="tariff-badge">Business</span>
                  <h3>Максимальный доход</h3>
                </div>
                <div className="tariff-cars">
                  <div className="tariff-car-item">
                    <div className="tariff-image-placeholder">
                      <img src="/cars/sonata.jpg" alt="Hyundai Sonata" className="tariff-image" />
                    </div>
                    <span className="tariff-car-name">Hyundai Sonata 2021–2023</span>
                  </div>
                  <div className="tariff-car-item">
                    <div className="tariff-image-placeholder">
                      <img src="/cars/honchi-business.jpg" alt="Honchi" className="tariff-image" />
                    </div>
                    <span className="tariff-car-name">Honchi</span>
                  </div>
                </div>
                <ul className="tariff-list">
                  <li>Бизнес-седаны и кроссоверы</li>
                  <li>Высокий средний чек и чаевые</li>
                  <li>Приоритетные корпоративные заказы</li>
                  <li>Персональный куратор</li>
                </ul>
                <div className="tariff-footer">
                  <div className="tariff-price">
                    <span className="label">от</span>
                    <span className="value">18 000 ₸ / день</span>
                  </div>
                  <a
                    href="https://wa.me/+77003608822?text=Хочу%20арендовать%20авто%20в%20тарифе%20Business"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-full"
                  >
                    Выбрать Business
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Быстрый подбор авто */}
        <section className="section section-alt" id="fleet">
          <div className="container">
            <h2 className="section-title animate-on-scroll fade-in-up">Быстрый подбор авто</h2>
            <p className="section-subtitle animate-on-scroll fade-in-up">
              Ответь на 3 вопроса — менеджер подберёт авто под твой опыт, режим и бюджет.
            </p>
            <div className="quick-form animate-on-scroll scale-in">
              <div className="quick-form-grid">
                <div className="field">
                  <label>Опыт в такси</label>
                  <div className="chips">
                    <span className="chip">Нет опыта</span>
                    <span className="chip">До 1 года</span>
                    <span className="chip">1–3 года</span>
                    <span className="chip">Более 3 лет</span>
                  </div>
                </div>
                <div className="field">
                  <label>Режим работы</label>
                  <div className="chips">
                    <span className="chip">Полный день</span>
                    <span className="chip">Подработка</span>
                    <span className="chip">Делим смену</span>
                  </div>
                </div>
                <div className="field">
                  <label>Предпочтительный класс</label>
                  <div className="chips">
                    <span className="chip">Comfort</span>
                    <span className="chip">Comfort+</span>
                    <span className="chip">Business</span>
                  </div>
                </div>
              </div>
              <div className="quick-form-cta">
                <p>Оставь WhatsApp или телефон — мы перезвоним в течение 15 минут.</p>
                <form
                  className="inline-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const target = e.target as HTMLFormElement
                    const formData = new FormData(target)
                    const contact = (formData.get('contact') as string) || ''
                    const encoded = encodeURIComponent(
                      `Хочу подобрать авто в аренду. Мой контакт: ${contact}`,
                    )
                    window.open(`https://wa.me/+77003608822?text=${encoded}`, '_blank')
                  }}
                >
                  <input
                    name="contact"
                    type="text"
                    placeholder="WhatsApp или номер телефона"
                    required
                  />
                  <button type="submit" className="btn btn-primary">
                    Подобрать авто
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Процесс 3 шага */}
        <section className="section" id="process">
          <div className="container">
            <h2 className="section-title animate-on-scroll fade-in-up">Как это работает</h2>
            <div className="steps">
              <div className="step animate-on-scroll fade-in-left">
                <div className="step-number">1</div>
                <h3>Оставляешь заявку / WhatsApp</h3>
                <p>Заполняешь форму на сайте или пишешь нам в WhatsApp — менеджер свяжется и проконсультирует.</p>
              </div>
              <div className="step animate-on-scroll fade-in-up">
                <div className="step-number">2</div>
                <h3>Приезжаешь с документами</h3>
                <p>
                  Приходишь в офис с водительским удостоверением и 2 залоговыми документами (военный
                  билет / паспорт / свидетельство о браке / диплом).
                </p>
              </div>
              <div className="step animate-on-scroll fade-in-right">
                <div className="step-number">3</div>
                <h3>Забираешь авто и выходишь в смену</h3>
                <p>Подписываем договор, выдаём авто и подключаем к сервису. Выход на линию возможен 24/7.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Отзывы (простые карточки) */}
        <section className="section section-alt" id="reviews">
          <div className="container">
            <h2 className="section-title animate-on-scroll fade-in-up">Что говорят водители</h2>
            <div className="grid reviews-grid">
              <div className="card review-card animate-on-scroll fade-in-left">
                <p>
                  «Перешёл с эконома на Comfort, доход вырос примерно на 30–40%. Машину выдали быстро, по
                  документам всё прозрачно.»
                </p>
                <span className="review-author">— Асхат, 2 года в такси</span>
              </div>
              <div className="card review-card animate-on-scroll fade-in-up">
                <p>
                  «Важно, что нет депозита — не пришлось вытаскивать накопления. ТО и ремонт не думаю вообще,
                  только работаю.»
                </p>
                <span className="review-author">— Данияр, водитель Comfort+</span>
              </div>
              <div className="card review-card animate-on-scroll fade-in-right">
                <p>
                  «У меня были сложности с банком, но тут помогли выйти на линию и зарабатывать. Поддержка на
                  связи круглосуточно.»
                </p>
                <span className="review-author">— Ержан, работает в Business</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="container">
            <h2 className="section-title animate-on-scroll fade-in-up">FAQ — часто задаваемые вопросы</h2>
            <div className="faq-list">
              <details className="faq-item animate-on-scroll fade-in-up" open>
                <summary>Какие документы нужны?</summary>
                <p>
                  Водительское удостоверение + 2 залоговых документа: военный билет, паспорт, свидетельство о
                  браке или диплом.
                </p>
              </details>
              <details className="faq-item animate-on-scroll fade-in-up">
                <summary>Какие требования к водителю?</summary>
                <p>
                  Возраст от 24 лет, класс страховки от 6 и выше, водительское удостоверение и 2 залоговых документа.
                </p>
              </details>
              <details className="faq-item animate-on-scroll fade-in-up">
                <summary>Есть ли депозит?</summary>
                <p>Нет, мы работаем без депозита и без первоначального взноса.</p>
              </details>
              <details className="faq-item animate-on-scroll fade-in-up">
                <summary>Какой минимальный срок аренды?</summary>
                <p>Минимальный срок аренды — 10 дней.</p>
              </details>
              <details className="faq-item animate-on-scroll fade-in-up">
                <summary>Помогаете ли при ДТП?</summary>
                <p>
                  Да, мы консультируем и помогаем в зависимости от ситуации. Подскажем, как оформить документы и
                  что делать дальше.
                </p>
              </details>
              <details className="faq-item animate-on-scroll fade-in-up">
                <summary>Есть ли поддержка 24/7?</summary>
                <p>Да, служба поддержки для водителей работает круглосуточно.</p>
              </details>
              <details className="faq-item animate-on-scroll fade-in-up">
                <summary>Есть ли выезд в межгород?</summary>
                <p>Нет, мы не предоставляем услуги выезда в межгород.</p>
              </details>
            </div>
          </div>
        </section>

        {/* Контакты / форма */}
        <section className="section section-cta" id="contacts">
          <div className="container section-cta-inner">
            <div className="section-cta-text animate-on-scroll fade-in-left">
              <h2>Готов начать зарабатывать уже сегодня?</h2>
              <p>Пора превратить арендную машину в источник дохода!</p>
              <div className="cta-contacts">
                <a href="tel:+77003608822">+7 700 360 88 22</a>
                <span>WhatsApp / звонок, 24/7</span>
              </div>
              <div className="cta-buttons">
                <a
                  href="https://wa.me/+77003608822"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  Написать в WhatsApp
                </a>
                <a href="tel:+77003608822" className="btn btn-outline">
                  Позвонить сейчас
                </a>
              </div>
            </div>
            <form
              className="lead-form animate-on-scroll fade-in-right"
              onSubmit={(e) => {
                e.preventDefault()
                const target = e.target as HTMLFormElement
                const formData = new FormData(target)
                const name = (formData.get('name') as string) || ''
                // Извлекаем только цифры из форматированного телефона
                const phoneDigits = phone.replace(/\D/g, '').replace(/^7/, '')
                // Проверяем, что есть 10 цифр
                if (phoneDigits.length !== 10) {
                  alert('Пожалуйста, введите полный номер телефона (10 цифр)')
                  return
                }
                const formattedPhone = `+7${phoneDigits}`
                const tariff = (formData.get('tariff') as string) || ''
                const encoded = encodeURIComponent(
                  `Заявка с сайта A2.\nИмя: ${name}\nТелефон: ${formattedPhone}\nТариф: ${tariff}`,
                )
                window.open(`https://wa.me/+77003608822?text=${encoded}`, '_blank')
                // Сбрасываем форму после отправки
                setPhone('')
                target.reset()
              }}
            >
              <h3>Оставить заявку</h3>
              <label>
                Имя
                <input name="name" type="text" placeholder="Как к вам обращаться" required />
              </label>
              <label>
                Телефон / WhatsApp
                <input
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  onKeyDown={handlePhoneKeyDown}
                  onFocus={handlePhoneFocus}
                  placeholder="+7 (777) - 777 - 77 - 77"
                  required
                />
              </label>
              <label>
                Интересующий тариф
                <select name="tariff" defaultValue="Comfort">
                  <option value="Comfort">Comfort</option>
                  <option value="Comfort+">Comfort+</option>
                  <option value="Business">Business</option>
                  <option value="Не выбрал">Пока не решил</option>
                </select>
              </label>
              <button type="submit" className="btn btn-primary btn-full">
                Отправить в WhatsApp
              </button>
              <p className="form-hint">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-left">
            <span>© {new Date().getFullYear()} A2. Аренда авто для такси.</span>
            <span>Все права защищены.</span>
          </div>
          <div className="footer-right">
            <a href="#top">Наверх</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


