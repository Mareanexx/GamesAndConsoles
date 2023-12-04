
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

if (ScrollTrigger.isTouch !== 1) {

	ScrollSmoother.create({
		wrapper: '.wrapper',
		content: '.content',
		smooth: 1.5,
		effects: true
	})

	gsap.fromTo('.header-section', { opacity: 1 }, {
		opacity: 0,
		scrollTrigger: {
			trigger: '.header-section',
			start: 'center',
			end: '820',
			scrub: true
		}
	})

	let itemsL = gsap.utils.toArray('.gallery__left .gallery__item')

	itemsL.forEach(item => {
		gsap.fromTo(item, { opacity: 0, x: -50 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: item,
				start: '-850',
				end: '-100',
				scrub: true
			}
		})
	})

	let itemsR = gsap.utils.toArray('.gallery__right .gallery__item')

	itemsR.forEach(item => {
		gsap.fromTo(item, { opacity: 0, x: 50 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: item,
				start: '-750',
				end: 'top',
				scrub: true
			}
		})
	})

	gsap.fromTo('.container-steam-deck', { x: 450 }, {
		x: 0,
		scrollTrigger: {
			trigger: '.container-steam-deck',
			start: '-2250',
			end: '-700',
			scrub: true
		}
	})

	gsap.fromTo('.container-asus-rogally', { x: -450 }, {
		x: 0,
		scrollTrigger: {
			trigger: '.container-asus-rogally',
			start: '-1850',
			end: '300',
			scrub: true
		}
	})
}
