import { CloseButton } from '../../CloseButton';
import { feedBackTypes, FeedBackType } from '../index';

interface FeedBackTypeStepProps{
    onFeedbackTypeChanged: (type: FeedBackType) => void;
}

export function FeedbackTypeStep({onFeedbackTypeChanged}: FeedBackTypeStepProps){
    return (
        <>
            <header>
                    <span className="text-xl leading-6">Deixe seu feedback</span>
                    <CloseButton/>
                </header>
            <div className='flex py-8 gap-2 w-full'>
            {
                Object.entries(feedBackTypes).map(([key, value]) => {
                    return (
                        <button onClick={() => onFeedbackTypeChanged(key as FeedBackType)} key={key} className='bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none'>
                            <img src={value.source} alt={value.alt} />
                            <span>{value.title}</span>
                        </button>
                    )
                })
            }
            </div>
        </>
    );
}